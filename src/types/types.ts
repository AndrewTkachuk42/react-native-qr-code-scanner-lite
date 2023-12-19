import {
  type HostComponent,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export type QrCodeScannerLiteNativeProps = {
  onQrCodeScanned: (args: any) => any;
  onError: (args: any) => any;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export type QrCodeScannerLiteViewType =
  HostComponent<QrCodeScannerLiteNativeProps>;

type QrCodeScannerLiteProps = QrCodeScannerLiteNativeProps &
  ViewProps & { scannerRef?: React.MutableRefObject<null> };

export type QrCodeScannerType = (props: QrCodeScannerLiteProps) => JSX.Element;
