# react-native-qr-code-scanner-lite

QR code scanner

## Installation

```sh
npm install react-native-qr-code-scanner-lite
```

## Usage

```js
import { QrCodeScanner, useQrScanner } from "react-native-qr-code-scanner-lite";

const { scannerRef } = useQrScanner();

const onQrCodeScanned = useCallback(({ nativeEvent }) => {
    // Do something with qr code data
  }, []);

const onError = useCallback(({ nativeEvent }) => {
  // Handle error
}, []);

// ...

<QrCodeScanner
      scannerRef={scannerRef}
      onQrCodeScanned={onQrCodeScanned}
      onError={onError}
    />
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
