import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle, withTiming,
  useSharedValue
} from 'react-native-reanimated';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
export const COLOR_WIDTH = width / 3;
const RADIUS = 55;

const styles = StyleSheet.create({
  gradient: {
    borderRadius: RADIUS,
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderColor: 'white',
  },

  container: {
    width: COLOR_WIDTH,
    alignItems: 'center',
  },
});

interface ColorProps {
  color: {
    start: string;
    end: string;
  };
  index: number;
  translateX: Animated.SharedValue<number>;
  onPress: (position: { x: number, y: number }) => void;
}

export default function Color({ color, index, translateX, onPress }: ColorProps) {
  const inputRange = [
    -COLOR_WIDTH * (index + 1),
    -COLOR_WIDTH * index,
    -COLOR_WIDTH * (index - 1),
  ];
  const onGestutureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onActive: ({ absoluteX: x, absoluteY: y }) => {
      runOnJS(onPress)({ x, y });
    },
  });
  const style = useAnimatedStyle(() => {
    const angle = interpolate(
      translateX.value,
      inputRange,
      [0, Math.PI / 2, Math.PI],
      Extrapolate.CLAMP,
    );
    const translateY = 100 * Math.cos(angle);
    const scale = 0.8 + 0.3 * Math.sin(angle);

    return {
      transform: [
        { translateX: translateX.value },
        { translateY },
        { scale },
      ],
    };
  });
  return (
    <Animated.View style={[styles.container, style]}>
      <TapGestureHandler onGestureEvent={onGestutureEvent}>
        <Animated.View>
          <LinearGradient
            colors={[color.start, color.end]}
            style={[styles.gradient, { borderWidth: borderWidth.value }]}
          />
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
}

