import React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';
import { QrCodeScanner } from 'react-native-qr-code-scanner-lite';
import { useApp } from './useApp';

const BUTTON_TITLE = {
  resume: 'resume scan',
  pause: 'pause scan',
};

export default function App() {
  const { scannerRef, qrData, error, onQrCodeScanned, onError, resume, pause } =
    useApp();

  return (
    <View style={styles.container}>
      <View>
        <QrCodeScanner
          scannerRef={scannerRef}
          onQrCodeScanned={onQrCodeScanned}
          onError={onError}
        />
        <View style={styles.valueWrapper}>
          <Text style={styles.value}>{qrData}</Text>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <Button title={BUTTON_TITLE.resume} onPress={resume} />
        <Button title={BUTTON_TITLE.pause} onPress={pause} />
      </View>

      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  valueWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0000004D',
  },
  value: {
    color: '#fff',
    fontSize: 24,
  },
  buttonWrapper: {
    padding: 16,
    gap: 8,
  },
  error: {
    fontSize: 24,
    padding: 16,
    color: 'red',
  },
});
