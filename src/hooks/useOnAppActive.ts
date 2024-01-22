import { useEffect, useRef } from 'react';

import { AppState, type AppStateStatus } from 'react-native';
import { APP_ACTIVE } from '../constants/constants';

export const useOnAppStateActive = (callback: () => void) => {
  // This hook fires a callbcak when app state changes to active (foreground)
  const previousAppState = useRef<AppStateStatus>(APP_ACTIVE);

  useEffect(() => {
    // Refresh permission when app state changes, as user might have allowed it in Settings
    const listener = AppState.addEventListener('change', (state) => {
      const condition =
        state === APP_ACTIVE && previousAppState.current !== APP_ACTIVE;

      previousAppState.current = state;

      if (!condition) {
        return;
      }

      callback();
    });

    return listener.remove;
  }, [callback]);
};
