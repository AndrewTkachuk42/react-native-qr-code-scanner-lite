import { PermissionsAndroid, NativeModules } from 'react-native';

import { IS_ANDROID } from '../constants/constants';

const checkAndroidPermission = () => {
  const permission = PermissionsAndroid.PERMISSIONS.CAMERA;

  if (!permission) {
    return false;
  }

  return PermissionsAndroid.check(permission);
};

const checkIosPermission = () =>
  NativeModules.QrCodeScannerLiteViewManager.checkPermission();

const requestAndroidPermission = () => {
  const permission = PermissionsAndroid.PERMISSIONS.CAMERA;

  if (!permission) {
    return false;
  }

  return PermissionsAndroid.request(permission);
};

const requestIosPermission = () =>
  NativeModules.QrCodeScannerLiteViewManager.requestPermission();

export const checkPermission = IS_ANDROID
  ? checkAndroidPermission
  : checkIosPermission;

export const requestPermission = IS_ANDROID
  ? requestAndroidPermission
  : requestIosPermission;
