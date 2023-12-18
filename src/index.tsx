import React, { useCallback, useEffect, useRef } from 'react';
import type { HostComponent } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  requireNativeComponent,
  Platform,
  findNodeHandle,
  Dimensions,
  UIManager,
  type ViewProps,
  NativeModules,
} from 'react-native';

const { width: windowWidth } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';

const LINKING_ERROR =
  `The package 'react-native-qr-code-scanner-lite' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type QrCodeScannerLiteNativeProps = {
  onQrCodeScanned: (args: any) => any;
  onError: (args: any) => any;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

type QrCodeScannerLiteProps = QrCodeScannerLiteNativeProps &
  ViewProps & { scannerRef: React.MutableRefObject<null> };

type QrCodeScannerLiteViewType = HostComponent<QrCodeScannerLiteNativeProps>;

const getNativeView = (): QrCodeScannerLiteViewType => {
  const ComponentName = isAndroid
    ? 'QrCodeScannerLiteViewManager'
    : 'QrCodeScannerLiteView';

  const nativeComponent =
    requireNativeComponent<QrCodeScannerLiteNativeProps>(ComponentName);

  if (!nativeComponent) {
    throw new Error(LINKING_ERROR);
  }

  return nativeComponent;
};

const QrCodeScannerLiteView = getNativeView();

enum COMMAND {
  create = '0',
  resume = '1',
  pause = '2',
}

const defaultStyle = {
  width: windowWidth,
  height: windowWidth,
};

export const QrCodeScanner = ({
  scannerRef,
  style,
  ...props
}: QrCodeScannerLiteProps) => (
  <QrCodeScannerLiteView
    ref={scannerRef}
    style={[defaultStyle, style]}
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

  const resumeScan = useCallback(() => {
    if (isAndroid) {
      sendCommand(COMMAND.resume);
      return;
    }

    NativeModules.QrCodeScannerLiteViewManager.resume();
  }, [sendCommand]);

  const pauseScan = useCallback(() => {
    if (isAndroid) {
      sendCommand(COMMAND.pause);
      return;
    }

    NativeModules.QrCodeScannerLiteViewManager.pause();
  }, [sendCommand]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      return;
    }

    viewId.current = findNodeHandle(scannerRef.current);

    createFragment();
  }, [createFragment]);

  return { scannerRef, resumeScan, pauseScan };
};
