import React, { useMemo } from 'react';

import QrCodeScannerLiteView from '../services/nativeComponent';
import type { QrCodeScannerType, Style } from '../types/types';
import { WINDOW_WIDTH } from '../constants/constants';

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
