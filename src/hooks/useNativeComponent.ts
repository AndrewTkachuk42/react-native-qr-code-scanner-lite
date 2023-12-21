import { useCallback, useEffect, useRef } from 'react';
import { findNodeHandle, NativeModules, UIManager } from 'react-native';
import { COMMAND, IS_ANDROID } from '../constants/constants';

export const useNativeComponent = () => {
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

  return {
    scannerRef,
    resumeScan,
    pauseScan,
  };
};
