import React, { useMemo } from 'react';

import type { QrCodeScannerType } from './types/types';
import { WINDOW_WIDTH } from './constants/constants';
import QrCodeScannerLiteView from './services/nativeComponent';
import { useQrCodeScanner as useQrCodeScannerHook } from './hooks/useQrCodeScanner';
import { useCameraPermission as useCameraPermissionHook } from './hooks/useCameraPermission';
import { useCameraComponent as useCameraComponentHook } from './hooks/useCameraComponent';

const defaultStyle = {
  width: WINDOW_WIDTH,
  height: WINDOW_WIDTH,
};

export const QrCodeScanner: QrCodeScannerType = ({
  scannerRef,
  style,
  ...props
}) => {
  const componentStyle = useMemo(() => [defaultStyle, style], [style]);

  return (
    <QrCodeScannerLiteView ref={scannerRef} style={componentStyle} {...props} />
  );
};

export const useCameraPermission = useCameraPermissionHook;
export const useCameraComponent = useCameraComponentHook;
export const useQrCodeScanner = useQrCodeScannerHook;
