//
//  QrCodeScannerLiteViewManager.swift
//  iosQrScanner
//
//  Created by Andrew Tkachuk on 17.12.2023.
//

import Foundation

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

  @objc override static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
