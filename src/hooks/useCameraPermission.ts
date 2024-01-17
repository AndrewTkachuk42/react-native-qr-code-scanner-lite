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

  useEffect(() => {
    if (isGranted || isPermissionRequsted.current || !IS_ANDROID) {
      return;
    }

    requestPermission();
  }, [isGranted, requestPermission]);

  useEffect(() => {
    if (!autoCheck) {
      return;
    }

    checkPermission();
  }, [autoCheck, checkPermission]);

  return { isGranted, checkPermission, requestPermission };
};
