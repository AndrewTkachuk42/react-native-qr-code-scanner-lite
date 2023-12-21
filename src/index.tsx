import React, { useMemo } from 'react';

import type { QrCodeScannerType } from './types/types';
import { WINDOW_WIDTH } from './constants/constants';
import QrCodeScannerLiteView from './services/nativeComponent';
import { useQrCodeScanner as useQrCodeScannerHook } from './hooks/useQrCodeScanner';

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

export const useQrCodeScanner = useQrCodeScannerHook;
