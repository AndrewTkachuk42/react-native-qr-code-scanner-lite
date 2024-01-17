import React, { useMemo } from 'react';

import type { QrCodeScannerType, Style } from './types/types';
import { WINDOW_WIDTH } from './constants/constants';
import QrCodeScannerLiteView from './services/nativeComponent';
import { useCameraPermission as useCameraPermissionHook } from './hooks/useCameraPermission';
import { useQrCodeScanner as useQrCodeScannerHook } from './hooks/useQrCodeScanner';

const defaultStyle: Style = {
  width: WINDOW_WIDTH,
  height: WINDOW_WIDTH,
};

export const QrCodeScanner: QrCodeScannerType = ({
  scannerRef,
  style,
  ...props
}) => {
  const componentStyle = useMemo(
    () => ({ ...defaultStyle, ...style }),
    [style]
  );

  return (
    <QrCodeScannerLiteView ref={scannerRef} style={componentStyle} {...props} />
  );
};

export const useCameraPermission = useCameraPermissionHook;
export const useQrCodeScanner = useQrCodeScannerHook;
