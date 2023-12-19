import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { findNodeHandle, NativeModules, UIManager } from 'react-native';

import type { QrCodeScannerType } from './types/types';
import { COMMAND, IS_ANDROID, WINDOW_WIDTH } from './constants/constants';
import QrCodeScannerLiteView from './services/nativeComponent';

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

export const useQrScanner = () => {
  const scannerRef = useRef(null);
  const viewId = useRef<number | null>(null);

  const sendCommand = useCallback(
    (command: COMMAND) =>
      UIManager.dispatchViewManagerCommand(viewId.current, command, [
        viewId.current,
      ]),
    []
  );

  const createFragment = useCallback(
    () => sendCommand(COMMAND.create),
    [sendCommand]
  );

  const resumeScan = useCallback(() => {
    if (IS_ANDROID) {
      sendCommand(COMMAND.resume);
      return;
    }

    NativeModules.QrCodeScannerLiteViewManager.resume();
  }, [sendCommand]);

  const pauseScan = useCallback(() => {
    if (IS_ANDROID) {
      sendCommand(COMMAND.pause);
      return;
    }

    NativeModules.QrCodeScannerLiteViewManager.pause();
  }, [sendCommand]);

  useEffect(() => {
    if (!IS_ANDROID) {
      return;
    }

    viewId.current = findNodeHandle(scannerRef.current);

    createFragment();
  }, [createFragment]);

  return { scannerRef, resumeScan, pauseScan };
};
