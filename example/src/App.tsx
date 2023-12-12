import React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';
import { QrCodeScanner } from 'react-native-qr-code-scanner-lite';
import { useApp } from './useApp';

const buttonTitle = 'resume scan';

export default function App() {
  const { scannerRef, qrData, error, onQrCodeScanned, onError, resume } =
    useApp();

  return (
    <View style={styles.container}>
      <QrCodeScanner
        scannerRef={scannerRef}
        onQrCodeScanned={onQrCodeScanned}
        onError={onError}
      />

      <Button title={buttonTitle} onPress={resume} />
      <Text>{qrData}</Text>
      <Text>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
