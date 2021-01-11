import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const RADIUS = 55;
const { width, height } = Dimensions.get('window');

interface Props {
  colorSelection: {
    position: { x: number, y: number };
    current: { start: string, end: string };
    previous: { start: string, end: string };
  }
}

export default function Background({ colorSelection }: Props) {
  const progress = useSharedValue(0);
  const MAX_RADIUS = Math.SQRT2 * Math.max(width + colorSelection.position.x, height + colorSelection.position.y) / 2;

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {duration: 650, easing: Easing.ease});
  }, [colorSelection]);
  const style = useAnimatedStyle(() => {
    return {
      top: -RADIUS + colorSelection.position.y,
      left: -RADIUS + colorSelection.position.x,
      borderRadius: RADIUS,
      width: RADIUS * 2,
      height: RADIUS * 2,
      backgroundColor: colorSelection.current.start,
      transform: [{ scale: progress.value * (MAX_RADIUS / RADIUS) }],
    };
  });
  return (
    <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: colorSelection.previous.start }}>
      <Animated.View style={style} />
    </View>
  );
}
