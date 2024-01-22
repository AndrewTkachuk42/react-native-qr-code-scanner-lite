import { PermissionsAndroid, NativeModules } from 'react-native';

import { IS_ANDROID, PERMISSION_GRANTED } from '../constants/constants';

const checkAndroidPermission = (): Promise<boolean> =>
  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA!);

const checkIosPermission = (): Promise<boolean> =>
  NativeModules.QrCodeScannerLiteViewManager.checkPermission();

const requestAndroidPermission = async (): Promise<boolean> => {
  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA!
  );

  return status === PERMISSION_GRANTED;
};

const requestIosPermission = (): Promise<boolean> =>
  NativeModules.QrCodeScannerLiteViewManager.requestPermission();

export const checkPermission = IS_ANDROID
  ? checkAndroidPermission
  : checkIosPermission;

export const requestPermission = IS_ANDROID
  ? requestAndroidPermission
  : requestIosPermission;
