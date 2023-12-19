import React from 'react';

import { Button, StyleSheet, View } from 'react-native';

const BUTTON_TITLE = {
  resume: 'resume scan',
  pause: 'pause scan',
};

type ButtonsProps = { resume: () => void; pause: () => void };

const Buttons = ({ resume, pause }: ButtonsProps) => (
  <View style={styles.buttonWrapper}>
    <Button title={BUTTON_TITLE.resume} onPress={resume} />
    <Button title={BUTTON_TITLE.pause} onPress={pause} />
  </View>
);

export default Buttons;

const styles = StyleSheet.create({
  buttonWrapper: {
    padding: 16,
    gap: 8,
  },
});
