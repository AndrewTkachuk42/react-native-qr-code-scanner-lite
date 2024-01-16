//
//  CameraView.swift
//  iosQrScanner
//
//  Created by Andrew Tkachuk on 16.12.2023.
//
import Foundation
import AVFoundation
import UIKit


class PreviewView: UIView {
    weak var parentViewController: CameraViewController?
    
    @objc var onQrCodeScanned: RCTDirectEventBlock?
    @objc var onError: RCTDirectEventBlock?
    
    convenience init() {
        self.init(frame: UIScreen.main.bounds)
    }
    
    override func reactSetFrame(_ frame: CGRect)
    {
        super.reactSetFrame(frame);
        
        let rect = CGRectMake(0, 0, frame.width, frame.height)
        parentViewController?.setupPreview(frame: rect)
    }
}

class CameraViewController: UIViewController {
    var captureDevice: AVCaptureDevice!
    var captureSession: AVCaptureSession!
    var previewLayer: AVCaptureVideoPreviewLayer!
    var previewView: PreviewView!
    
    let initializeErrorData = ["type": "INITIALIZATION_ERROR", "message": "Failed to initialize camera session."]
    
    func sendReadEvent(_ data: [AnyHashable: Any]) {
        if (previewView.onQrCodeScanned == nil) {
            return
        }
        
        previewView.onQrCodeScanned!(data)
    }
    
    func sendErrorEvent(_ errorData: [AnyHashable: Any]) {
        if (previewView.onError == nil) {
            return
        }
        
        previewView.onError!(["ERROR": errorData])
    }
    
    override func loadView() {
        previewView = PreviewView()
        previewView.parentViewController = self
        
        super.view = previewView
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupSession()
    }
    
    
    
    
    func setupSession () {
        view.backgroundColor = UIColor.black
        captureSession = AVCaptureSession()
        
        captureDevice = AVCaptureDevice.default(for: .video)
        
        if (captureDevice == nil) {
            onSetupFailed()
            return
        }
        
        let videoInput: AVCaptureDeviceInput
        
        do {
            videoInput = try AVCaptureDeviceInput(device: captureDevice)
        } catch {
            onSetupFailed()
            return
        }
        
        if (captureSession.canAddInput(videoInput)) {
            captureSession.addInput(videoInput)
        } else {
            onSetupFailed()
            return
        }
        
        let metadataOutput = AVCaptureMetadataOutput()
        
        if (captureSession.canAddOutput(metadataOutput)) {
            captureSession.addOutput(metadataOutput)
            
            metadataOutput.setMetadataObjectsDelegate(self, queue: DispatchQueue.main)
            metadataOutput.metadataObjectTypes = [.qr]
        } else {
            onSetupFailed()
            return
        }
    }
    
    func setupPreview (frame: CGRect){
        if (captureSession == nil) {
            onSetupFailed()
            return
        }
        
        previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        previewLayer.frame = frame;
        previewLayer.videoGravity = .resizeAspectFill
        view.layer.addSublayer(previewLayer)
        
        
        DispatchQueue.main.async(execute: {
            self.captureSession.startRunning()
        })
        
    }
    
    
    func onSetupFailed() {
        sendErrorEvent(initializeErrorData)
        captureSession = nil
    }
    
    func found(codeObject: AVMetadataMachineReadableCodeObject) {
        guard let value = codeObject.stringValue else { return }
        sendReadEvent(["data": value])
    }
    
    @objc
    func pause () {
        if (captureSession?.isRunning == true) {
            captureSession.stopRunning()
        }
    }
    
    @objc
    func resume () {
        DispatchQueue.main.async(execute: {
            if (self.captureSession?.isRunning == true) {
                return
            }
            
            self.captureSession.startRunning()
        })
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        resume()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        pause()
    }
}

extension CameraViewController: AVCaptureMetadataOutputObjectsDelegate {
    func metadataOutput(_ output: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from connection: AVCaptureConnection) {
        if let metadataObject = metadataObjects.first {
            guard let readableObject = metadataObject as? AVMetadataMachineReadableCodeObject else { return }
            
            found(codeObject: readableObject)
        }
    }
}
