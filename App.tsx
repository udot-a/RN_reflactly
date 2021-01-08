import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ColorSelection from './src';
import MySelect from './src/MySelect';

export default function App() {
  return (
    <View style={styles.container}>
      <MySelect />
    </View>
      // <ColorSelection/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
