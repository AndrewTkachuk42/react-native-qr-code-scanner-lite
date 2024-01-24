#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(QrCodeScannerLiteViewManager, RCTViewManager)

RCT_EXTERN_METHOD(resume)
RCT_EXTERN_METHOD(pause)
RCT_EXTERN_METHOD(checkPermission:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(requestPermission:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXPORT_VIEW_PROPERTY(onQrCodeScanned, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock)

@end
