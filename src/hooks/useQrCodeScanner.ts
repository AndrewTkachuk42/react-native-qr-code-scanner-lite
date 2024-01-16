import { useCameraPermission } from './useCameraPermission';
import { useCameraComponent } from './useCameraComponent';

export const useQrCodeScanner = () => {
  const { isGranted, checkPermission, requestPermission } =
    useCameraPermission();

  const { scannerRef, resumeScan, pauseScan } = useCameraComponent();

  return {
    scannerRef,
    resumeScan,
    pauseScan,
    isGranted,
    checkPermission,
    requestPermission,
  };
};
