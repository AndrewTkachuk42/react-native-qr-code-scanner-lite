import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-qr-code-scanner-lite' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type QrCodeScannerLiteProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'QrCodeScannerLiteView';

export const QrCodeScannerLiteView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<QrCodeScannerLiteProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
