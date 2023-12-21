import { useCameraPermission } from './useCameraPermission';
import { useNativeComponent } from './useNativeComponent';

export const useQrCodeScanner = () => {
  const { isGranted, checkPermission, requestPermission } =
    useCameraPermission();

  const { scannerRef, resumeScan, pauseScan } = useNativeComponent();

  return {
    scannerRef,
    resumeScan,
    pauseScan,
    isGranted,
    checkPermission,
    requestPermission,
  };
};
