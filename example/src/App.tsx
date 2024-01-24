import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { QrCodeScanner } from 'react-native-qr-code-scanner-lite';

import { useApp } from './useApp';
import Buttons from './Buttons';
import { CAMERA_SIZE } from '../../src/constants/constants';

const QrData = ({ qrData }: { qrData: string | null }) => {
  if (!qrData) {
    return null;
  }

  return (
    <View style={styles.qrDataWrapper}>
      <Text style={styles.qrData}>{qrData}</Text>
    </View>
  );
};

export default function App() {
  const { scannerRef, qrData, error, onQrCodeScanned, onError, resume, pause } =
    useApp();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraWrapper}>
        <QrCodeScanner
          scannerRef={scannerRef}
          onQrCodeScanned={onQrCodeScanned}
          onError={onError}
          style={styles.camera}
        />
        <QrData qrData={qrData} />
      </View>

      <Buttons resume={resume} pause={pause} />
      <Text style={styles.error}>{error}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  cameraWrapper: {
    margin: 16,
    borderRadius: 32,
    overflow: 'hidden',
  },
  camera: {
    width: CAMERA_SIZE,
    height: CAMERA_SIZE,
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
