package com.qrcodescannerlite

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext

class QrCodeScannerLitePackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    return emptyList()
  }
  override fun createViewManagers(
    reactContext: ReactApplicationContext
  ) = listOf(QrCodeScannerLiteViewManager(reactContext))
}


