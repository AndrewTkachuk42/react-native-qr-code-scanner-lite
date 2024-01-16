import { useState, useCallback } from 'react';
import {
  useCameraPermission,
  useCameraComponent,
} from 'react-native-qr-code-scanner-lite';

export const useApp = () => {
  useCameraPermission();
  const { scannerRef, resumeScan, pauseScan } = useCameraComponent();

  const [qrData, setQrData] = useState(null);
  const [error, setError] = useState(null);

  const onQrCodeScanned = useCallback(({ nativeEvent }) => {
    setQrData(nativeEvent?.data);
  }, []);

  const onError = useCallback(({ nativeEvent }) => {
    setError(nativeEvent?.message);
  }, []);

  const resetState = useCallback(() => {
    setQrData(null);
    setError(null);
  }, []);

  const resume = useCallback(() => {
    resetState();
    resumeScan();
  }, [resumeScan, resetState]);

  const pause = useCallback(() => {
    resetState();
    pauseScan();
  }, [pauseScan, resetState]);

  return {
    scannerRef,
    qrData,
    error,
    onQrCodeScanned,
    onError,
    resume,
    pause,
  };
};
