import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
export const COLOR_WIDTH = width / 3;
const RADIUS = 45;

const styles = StyleSheet.create({
  gradient: {
    borderRadius: RADIUS,
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderWidth: 6,
    borderColor: 'white'
  },

  container: {
    width: COLOR_WIDTH,
    alignItems: 'center'
  }
});

interface ColorProps {
  color: {
    start: string;
    end: string;
  };

  index: number;

  translateX: Animated.SharedValue<number>;
}

export default function Color({ color, index, translateX }: ColorProps) {
  const style = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}]
    }
  })
  return (
    <Animated.View style={[styles.container, style]}>
      <LinearGradient
        colors={[color.start, color.end]}
        style={styles.gradient}
      />
    </Animated.View>
  );
}

