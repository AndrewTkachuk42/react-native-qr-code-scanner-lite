//
//  QrCodeScannerLiteViewManager.swift
//  iosQrScanner
//
//  Created by Andrew Tkachuk on 17.12.2023.
//

import Foundation
import AVFoundation

@objc(QrCodeScannerLiteViewManager)
class QrCodeScannerLiteViewManager: RCTViewManager {
    var viewController: CameraViewController!
    
    override func view() -> UIView! {
        viewController = CameraViewController()
        return viewController.view
    }
    
    @objc(presentViewController)
    func presentViewController() {
        DispatchQueue.main.async {
            let rootViewController = RCTPresentedViewController()
            
            rootViewController?.present(self.viewController, animated: true, completion: nil)
        }
    }
    
    @objc
    func resume() {
        viewController.resume()
    }
    
    @objc
    func pause() {
        viewController.pause()
    }
    
    @objc
    func checkPermission(_ resolve: RCTPromiseResolveBlock, rejecter reject:RCTPromiseRejectBlock) -> Void {
        let isAuthorized = AVCaptureDevice.authorizationStatus(for: .video) ==  .authorized
        resolve(isAuthorized)
    }
    
    @objc
    func requestPermission(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject:RCTPromiseRejectBlock) -> Void {
        AVCaptureDevice.requestAccess(for: .video, completionHandler: { (granted: Bool) in
            if granted {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    }
    
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
