import {
  type HostComponent,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export type QrCodeScannerLiteComponentProps = {
  onQrCodeScanned: (args: any) => any;
  onError?: (args: any) => any;
  style?: StyleProp<ViewStyle>;
};

export type QrCodeScannerLiteViewType =
  HostComponent<QrCodeScannerLiteComponentProps>;

type QrCodeScannerLiteProps = QrCodeScannerLiteComponentProps &
  ViewProps & { scannerRef?: React.MutableRefObject<null> };

export type QrCodeScannerType = (props: QrCodeScannerLiteProps) => JSX.Element;
