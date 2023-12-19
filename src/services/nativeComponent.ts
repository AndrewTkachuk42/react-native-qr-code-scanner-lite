import { requireNativeComponent } from 'react-native';

import type {
  QrCodeScannerLiteNativeProps,
  QrCodeScannerLiteViewType,
} from '../types/types';
import { COMPONENT_NAME, LINKING_ERROR } from '../constants/constants';

const getNativeView = (): QrCodeScannerLiteViewType => {
  const nativeComponent =
    requireNativeComponent<QrCodeScannerLiteNativeProps>(COMPONENT_NAME);

  if (!nativeComponent) {
    throw new Error(LINKING_ERROR);
  }

  return nativeComponent;
};

const QrCodeScannerLiteView = getNativeView();

export default QrCodeScannerLiteView;
