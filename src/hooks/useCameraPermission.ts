import { useCallback, useEffect, useState } from 'react';

import {
  checkPermission as checkPermissionService,
  requestPermission as requestPermissionService,
} from '../services/permission';
import { useOnAppStateActive } from './useOnAppActive';

export const useCameraPermission = (autoCheck: boolean = true) => {
  const [isGranted, setIsGranted] = useState(false);

  const checkPermission = useCallback(async () => {
    const result = await checkPermissionService();
    setIsGranted(result);

    return result;
  }, []);

  const requestPermission = useCallback(async () => {
    const result = await requestPermissionService();

    setIsGranted(result);

    return result;
  }, []);

  const checkAndRequestPermission = useCallback(async () => {
    const result = await checkPermission();

    if (result) {
      return result;
    }

    return requestPermission();
  }, [checkPermission, requestPermission]);

  useOnAppStateActive(checkPermission); // Refresh permission when app state changes to "active", as user might have allowed it in Settings

  useEffect(() => {
    // This effect checks permission on mount if autoCheck prop !== false
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
