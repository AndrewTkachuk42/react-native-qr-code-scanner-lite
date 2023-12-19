import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { QrCodeScanner } from 'react-native-qr-code-scanner-lite';

import { useApp } from './useApp';
import Buttons from './Buttons';

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
        <View style={styles.qrDataWrapper}>
          <Text style={styles.qrData}>{qrData}</Text>
        </View>
      </View>

      <Buttons resume={resume} pause={pause} />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  error: {
    fontSize: 24,
    padding: 16,
    color: 'red',
  },
  qrDataWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0000004D',
  },
  qrData: {
    color: '#fff',
    fontSize: 24,
  },
});
