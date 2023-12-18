#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(QrCodeScannerLiteViewManager, RCTViewManager)

RCT_EXTERN_METHOD(resume)
RCT_EXTERN_METHOD(pause)

RCT_EXPORT_VIEW_PROPERTY(onQrCodeScanned, RCTDirectEventBlock)

@end
