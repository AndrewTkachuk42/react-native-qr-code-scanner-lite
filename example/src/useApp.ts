import { useState, useCallback } from 'react';
import { useQrScanner } from 'react-native-qr-code-scanner-lite';

export const useApp = () => {
  const [qrData, setQrData] = useState(null);
  const [error, setError] = useState(null);

  const { ref: scannerRef, resumeScan } = useQrScanner();

  const onQrCodeScanned = useCallback(({ nativeEvent }) => {
    setQrData(nativeEvent?.data);
  }, []);

  const onError = useCallback(({ nativeEvent }) => {
    setError(nativeEvent?.message);
  }, []);

  const resume = useCallback(() => {
    setQrData(null);
    setError(null);
    resumeScan();
  }, [resumeScan]);

  return {
    scannerRef,
    qrData,
    error,
    onQrCodeScanned,
    onError,
    resume,
  };
};
