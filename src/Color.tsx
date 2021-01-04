import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle } from 'react-native-reanimated';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';

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
  onPress: (position: {x: number, y: number}) => void;
}

export default function Color({ color, index, translateX, onPress }: ColorProps) {
  const onGestutureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onActive: ({absoluteX: x, absoluteY:  y}) => {
      runOnJS(onPress)({x, y});
    }
  });
  const style = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}]
    }
  })
  return (
    <Animated.View style={[styles.container, style]}>
      <TapGestureHandler onGestureEvent={onGestutureEvent}>
        <Animated.View>
          <LinearGradient
            colors={[color.start, color.end]}
            style={styles.gradient}
          />
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
}

