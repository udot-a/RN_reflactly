import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Color from './Color';

const colors = [
  {
    id: 0,
    start: '#00E0D3',
    end: '#00B4D4',
  },
  {
    id: 1,
    start: '#00B4D4',
    end: '#409CAE',
  },
  {
    id: 2,
    start: '#66D8A4',
    end: '#409CAE',
  },
  {
    id: 3,
    start: '#FC727B',
    end: '#F468A0',
  },
  {
    id: 4,
    start: '#8289EA',
    end: '#7A6FC1',
  },
  {
    id: 5,
    start: '#FEC7A3',
    end: '#FD9F9C',
  },
];

const ColorSelection = () => {
  const translateX = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: ({ translationX }) => {
      translateX.value = translationX;
    },
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={styles.container}>
        {
          colors.map((color, index) => {
            return (
              <Color
                key={index}
                color={color}
                index={index}
                translateX={translateX}
              />
            );
          })
        }
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default ColorSelection;
