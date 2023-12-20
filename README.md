# react-native-qr-code-scanner-lite

Simple QR code scanner.
If you only use camera in your project to scan QR codes, this package probably suits you well.
There is no need to install any additional packages, like huge camera libraries.

## Installation

```sh
npm install react-native-qr-code-scanner-lite
```

### Android

1. Add camera permission to your `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

  <!-- Add this -->

  <uses-feature
    android:name="android.hardware.camera"
    android:required="false" />
  <uses-permission android:name="android.permission.CAMERA" />

  <!-- … -->

</manifest>
```

### Ios

1. Add camera usage description to info.plist file:

```xml
<key>NSCameraUsageDescription</key>
<string>This app uses camera to scan qr codes.</string>
```

2. Install pods by running "pod install" in ./ios directory

```sh
cd ios && pod install
```

### Requset camera permission

1. Camera permission is a runtime permission. So you need to ask a user for a permission to use camera. This package won't work without a permission.
You can use [react-native-permissions](https://github.com/zoontek/react-native-permissions). Also, you can add permission manually, in your phone settings, after the app is installed.

## Usage

```js
import { QrCodeScanner, useQrScanner } from "react-native-qr-code-scanner-lite";

const App = () => {
  const { scannerRef, resumeScan, pauseScan } = useQrScanner();

  const onQrCodeScanned = useCallback(({ nativeEvent }) => {
    // Do something with qr code data
  }, []);

  const onError = useCallback(({ nativeEvent }) => {
    // Handle error
  }, []);

  return (
      <View>
        <QrCodeScanner
          scannerRef={scannerRef}
          onQrCodeScanned={onQrCodeScanned}
          onError={onError}
        />
        <Button title={'resume'} onPress={resumeScan} />
        <Button title={'pause'} onPress={pauseScan} />
      </View>
  );
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
