import React, { useCallback, useEffect, useRef } from 'react';
import {
  requireNativeComponent,
  Platform,
  findNodeHandle,
  Dimensions,
  UIManager,
  type ViewProps,
} from 'react-native';

const { width: windowWidth } = Dimensions.get('window');

const LINKING_ERROR =
  `The package 'react-native-qr-code-scanner-lite' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ComponentName = 'QrCodeScannerLiteViewManager';

const QrCodeScannerLiteViewManager = requireNativeComponent(ComponentName);

export enum COMMAND {
  create = '0',
  resume = '1',
  pause = '2',
}

if (!QrCodeScannerLiteViewManager) {
  throw new Error(LINKING_ERROR);
}

type QrCodeScannerLiteProps = ViewProps & {
  onQrCodeScanned: (args: any) => any;
  onError: (args: any) => any;
  scannerRef: React.MutableRefObject<null>;
  width?: number;
  height?: number;
};

export const QrCodeScanner = ({
  scannerRef,
  width = windowWidth,
  height = windowWidth,
  ...props
}: QrCodeScannerLiteProps) => (
  <QrCodeScannerLiteViewManager
    ref={scannerRef}
    style={{
      width,
      height,
    }}
    {...props}
  />
);

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

  const resumeScan = useCallback(
    () => sendCommand(COMMAND.resume),
    [sendCommand]
  );

  const pauseScan = useCallback(
    () => sendCommand(COMMAND.pause),
    [sendCommand]
  );

  useEffect(() => {
    viewId.current = findNodeHandle(scannerRef.current);

    createFragment();
  }, [createFragment]);

  return { scannerRef, resumeScan, pauseScan };
};
