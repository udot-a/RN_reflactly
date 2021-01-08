import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableHighlight,
} from 'react-native';

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const listData = [
  'Do my homework',
  'Go home',
  'Drink some coffee',
  'Eat some food',
  'What a wonderful life',
  'Anybody home',
  'Love you',
];

export default function MySelect() {
  const [currentMargin, setCurrentMargin] = useState(0);

  const margin = useSharedValue(0);

  const animeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: margin.value }],
    };
  });
  return (
    <>
      <View style={styles.container}>
        <Animated.View style={animeStyle}>
          {
            listData.map((item, key) => (
              <Text style={{ fontSize: 20 }}>
                {item}
              </Text>
            ))
          }
        </Animated.View>

        <View style={styles.buttonSection}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor='#DDDDDD'
            onPress={() => {
              if (!margin.value) return;
              margin.value = margin.value - 10;
              console.log('Val', margin.value);

            }}
          >
            <Text>
              &#11014;
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor='#DDDDDD'
            onPress={() => {
              if (margin.value > 200) return;
              margin.value = margin.value + 10;
              console.log('Val', margin.value);
            }}
          >
            <Text>
              &#11015;
            </Text>
          </TouchableHighlight>
        </View>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 50,
    borderWidth: 2,
    borderColor: 'tomato',
    position: 'relative',
    overflow: 'hidden',
  },

  buttonSection: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'green',
    top: 2,
    right: 2,
    left: 170,
    bottom: 2,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
