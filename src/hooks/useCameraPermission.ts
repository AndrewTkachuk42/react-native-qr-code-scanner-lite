import { useCallback, useEffect, useRef, useState } from 'react';
import { PermissionsAndroid } from 'react-native';

import { IS_ANDROID } from '../constants/constants';

const checkAndroidPermission = () => {
  const permission = PermissionsAndroid.PERMISSIONS.CAMERA;

  if (!permission) {
    return false;
  }

  return PermissionsAndroid.check(permission);
};

const checkIosPermission = async () => {
  // TODO: implement ios check

  return false;
};

const requestAndroidPermission = () => {
  const permission = PermissionsAndroid.PERMISSIONS.CAMERA;

  if (!permission) {
    return false;
  }

  return PermissionsAndroid.request(permission);
};

const requestIosPermission = async () => {
  // TODO: implement ios check

  return false;
};

export const useCameraPermission = () => {
  const [isGranted, setIsGranted] = useState(false);

  const isPermissionRequsted = useRef(false);

  const checkPermission = useCallback(async () => {
    const check = IS_ANDROID ? checkAndroidPermission : checkIosPermission;

    const result = await check();
    setIsGranted(result);

    return result;
  }, []);

  const requstPermission = useCallback(async () => {
    const request = IS_ANDROID
      ? requestAndroidPermission
      : requestIosPermission;

    const result = await request();
    isPermissionRequsted.current = true;

    setIsGranted(result === PermissionsAndroid.RESULTS.GRANTED);

    return result;
  }, []);

  useEffect(() => {
    if (isGranted || isPermissionRequsted.current) {
      return;
    }

    requstPermission();
  }, [isGranted, requstPermission]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return { isGranted, checkPermission, requstPermission };
};
