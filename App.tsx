import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ColorSelection from './src';
import MySelect from './src/MySelect';
import AnimatedComponent from './src/AnimatedComponent';

const randomRange = (min: number, max: number) => {
  if (max - min <0) {
    return 0;
  }
  return Math.floor(Math.random() * (max - min+1) +min);
}

export default function App() {
  const [value, setValue] = useState(20);
  return (
    <View style={styles.container}>
      <AnimatedComponent value={value}/>

      <Button
        title={'Pres me'}
        onPress={() => {
          setValue(randomRange(10, 100))
        }}
      />
    </View>
      // <ColorSelection/>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
