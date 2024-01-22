import { Platform, Dimensions } from 'react-native';

export enum COMMAND {
  create = '0',
  resume = '1',
  pause = '2',
}

export const WINDOW_WIDTH = Dimensions.get('window').width;

const PADDING = 16;
export const CAMERA_SIZE = WINDOW_WIDTH - PADDING * 2;

export const IS_ANDROID = Platform.OS === 'android';

export const COMPONENT_NAME = IS_ANDROID
  ? 'QrCodeScannerLiteViewManager'
  : 'QrCodeScannerLiteView';

export const LINKING_ERROR =
  `The package 'react-native-qr-code-scanner-lite' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export const PERMISSION_GRANTED = 'granted';
export const APP_ACTIVE = 'active';
