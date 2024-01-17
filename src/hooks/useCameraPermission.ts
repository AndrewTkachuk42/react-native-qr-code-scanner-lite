import { useCallback, useEffect, useRef, useState } from 'react';
import { PermissionsAndroid } from 'react-native';

import {
  checkPermission as checkPermissionService,
  requestPermission as requestPermissionService,
} from '../services/permission';
import { IS_ANDROID } from '../constants/constants';

export const useCameraPermission = (autoCheck: boolean = true) => {
  const [isGranted, setIsGranted] = useState(false);

  const isPermissionRequsted = useRef(false);

  const checkPermission = useCallback(async () => {
    const result = await checkPermissionService();
    setIsGranted(result);

    return result;
  }, []);

  const requestPermission = useCallback(async () => {
    const result = await requestPermissionService();
    isPermissionRequsted.current = true;

    setIsGranted(result === PermissionsAndroid.RESULTS.GRANTED);

    return result;
  }, []);

  const checkAndRequestPermission = useCallback(async () => {
    const result = await checkPermission();

    if (result || isPermissionRequsted.current || !IS_ANDROID) {
      return;
    }

    requestPermission();
  }, [checkPermission, requestPermission]);

  useEffect(() => {
    if (!autoCheck) {
      return;
    }

    checkAndRequestPermission();
  }, [autoCheck, checkAndRequestPermission]);

  return {
    isGranted,
    checkPermission,
    requestPermission,
    checkAndRequestPermission,
  };
};
