import { type HostComponent } from 'react-native';

export type Style = {
  width?: number;
  height?: number;
  borderRadius?: number;
  overflow?: string;
};

export type QrCodeScannerLiteComponentProps = {
  onQrCodeScanned: (args: any) => any;
  onError?: (args: any) => any;
  style?: Style;
};

export type QrCodeScannerLiteViewType =
  HostComponent<QrCodeScannerLiteComponentProps>;

type QrCodeScannerLiteProps = QrCodeScannerLiteComponentProps & {
  scannerRef?: React.MutableRefObject<null>;
};

export type QrCodeScannerType = (props: QrCodeScannerLiteProps) => JSX.Element;
