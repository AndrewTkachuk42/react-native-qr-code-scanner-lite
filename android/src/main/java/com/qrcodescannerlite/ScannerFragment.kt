// replace with your package
package com.qrcodescannerlite

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.annotation.OptIn
import androidx.camera.core.CameraSelector
import androidx.camera.core.ExperimentalGetImage
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import com.google.common.util.concurrent.ListenableFuture
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import androidx.camera.core.resolutionselector.ResolutionSelector
import androidx.camera.core.resolutionselector.ResolutionStrategy
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import java.util.concurrent.Executors
import com.google.mlkit.vision.barcode.BarcodeScanner
import com.google.mlkit.vision.barcode.BarcodeScannerOptions
import com.google.mlkit.vision.barcode.BarcodeScanning
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.common.InputImage


class ScannerFragment(private val reactContext: ReactApplicationContext) : Fragment() {
  private var isScanning = false
  private lateinit var cameraPreviewLayout: CameraPreviewLayout

  private lateinit var cameraSelector: CameraSelector
  private lateinit var processCameraProviderFuture: ListenableFuture<ProcessCameraProvider>
  private lateinit var processCameraProvider: ProcessCameraProvider
  private lateinit var cameraPreview: Preview
  private lateinit var imageAnalysis: ImageAnalysis
  private lateinit var events: Events

  override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
  ): CameraPreviewLayout {
    super.onCreateView(inflater, container, savedInstanceState)
    cameraPreviewLayout = CameraPreviewLayout(requireNotNull(context))
    cameraPreviewLayout.previewView.alpha = 0F

    events = Events(reactContext, id)
    return cameraPreviewLayout
  }

  override fun onDestroyView() {
    super.onDestroyView()
    unbindCamera()
  }

  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    // do any logic that should happen in an `onCreate` method, e.g:
    // customView.onCreate(savedInstanceState);

    start()
  }

  private fun start() {
    initCamera()
    buildInputAnalyser()

    processCameraProviderFuture.addListener({
      processCameraProvider = processCameraProviderFuture.get()
      bindCamera()

      cameraPreviewLayout.previewView.animate().alpha(1f).setDuration(500).startDelay = 500
    }, ContextCompat.getMainExecutor(requireNotNull(context)))
  }

  private fun initCamera() {
    cameraSelector =
      CameraSelector.Builder().requireLensFacing(CameraSelector.LENS_FACING_BACK).build()

    processCameraProviderFuture = ProcessCameraProvider.getInstance(requireNotNull(context))

    val resolutionSelector = ResolutionSelector.Builder().setResolutionStrategy(ResolutionStrategy.HIGHEST_AVAILABLE_STRATEGY).build()

    cameraPreview = Preview.Builder()
      .setTargetRotation(cameraPreviewLayout.previewView.display.rotation)
      .setResolutionSelector(resolutionSelector)
      .build()

    cameraPreview.setSurfaceProvider(cameraPreviewLayout.previewView.surfaceProvider)
  }

  private fun buildInputAnalyser() {
    val barcodeScanner: BarcodeScanner = BarcodeScanning.getClient(
      BarcodeScannerOptions.Builder()
        .setBarcodeFormats(Barcode.FORMAT_QR_CODE)
        .build()
    )
    imageAnalysis = ImageAnalysis.Builder()
      .setTargetRotation(cameraPreviewLayout.previewView.display.rotation)
      .build()

    val cameraExecutor = Executors.newSingleThreadExecutor()

    imageAnalysis.setAnalyzer(cameraExecutor) { imageProxy ->
      processImageProxy(barcodeScanner, imageProxy)
    }
  }

  @OptIn(ExperimentalGetImage::class) private fun processImageProxy(
    barcodeScanner: BarcodeScanner,
    imageProxy: ImageProxy
  ) {
    val inputImage =
      InputImage.fromMediaImage(imageProxy.image!!, imageProxy.imageInfo.rotationDegrees)

    barcodeScanner.process(inputImage)
      .addOnSuccessListener { barcodes ->
        if (barcodes.isNotEmpty()) {
          onBarcodeScanned(barcodes.first())
        }
      }
      .addOnFailureListener {
        events.sendReadError(it.message)
      }.addOnCompleteListener {
        imageProxy.close()
      }
  }

  private fun onBarcodeScanned(barcode: Barcode) {
    events.sendQrCodeScanned(prepareBarcodeData(barcode))
  }

  private fun prepareBarcodeData(barcode: Barcode): WritableMap {
    return Arguments.createMap().apply {
      putString("type", barcode.valueType.toString())
      putString("data", barcode.rawValue)
    }
  }

  private fun bindCamera(){
    if (isScanning) {
      return
    }

    try {
      val camera = processCameraProvider.bindToLifecycle(this, cameraSelector, cameraPreview, imageAnalysis)
      camera.cameraControl.setLinearZoom(0f)

      isScanning = true
    } catch (error: Throwable) {
      events.sendInitializationError(error.message)
    }
  }

  fun unbindCamera(){
    if (!isScanning) {
      return
    }

    processCameraProvider.unbindAll()
    isScanning = false
  }

  fun resumeScan() {
    bindCamera()
  }
}
