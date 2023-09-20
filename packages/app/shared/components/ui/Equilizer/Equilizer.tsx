import React, { useEffect } from 'react'
import { Animated } from 'react-native'
import { useDynamicStyles, getDynamicStylesInput } from 'app/shared/hooks'
import { View } from '../index'

const EQUILIZER_AREA_HEIGHT = 10
const BAR_WIDTH = 2
const BAR_MAX_HEIGHT = 10
const TIME_FROM_BOTTOM_TO_TOP = 350
const TIME_FROM_TOP_TO_BOTTOM = 350
export const dynamicStylesInput = getDynamicStylesInput((theme) => {
  return {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    equalizer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: EQUILIZER_AREA_HEIGHT,
    },
    bar: {
      width: BAR_WIDTH,
      marginRight: 2,
      backgroundColor: theme.colors.primary,
    },
  }
})

const runAnimation = (value: Animated.AnimatedValue, index: number) => {
  const animation = Animated.loop(
    Animated.sequence([
      Animated.timing(value, {
        toValue: 1,
        duration: TIME_FROM_BOTTOM_TO_TOP,
        useNativeDriver: true,
      }),
      Animated.timing(value, {
        toValue: 0,
        duration: TIME_FROM_TOP_TO_BOTTOM,
        useNativeDriver: true,
      }),
    ])
  )

  animation.start()

  return () => animation.reset()
}

export const Equalizer = ({ isPlaying }) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  const animationValues = Array.from(
    { length: 3 },
    (_, i) => new Animated.Value(i * 0.1)
  )
  useEffect(() => {
    if (isPlaying) {
      animationValues.forEach((value, i) => {
        value.setValue(0.1 * i)
      })
      animationValues.forEach((value, index) => {
        runAnimation(value, index)
      })
    } else {
      animationValues.forEach((value) => {
        value.setValue(0)
      })
    }
  }, [isPlaying])

  const bars = React.useMemo(
    () =>
      animationValues.map((value, index) => (
        <Animated.View
          key={index}
          style={[
            dynamicStyles.bar,
            {
              height: value.interpolate({
                inputRange: [0, 1],
                outputRange: [1, BAR_MAX_HEIGHT],
              }),
            },
          ]}
        />
      )),
    [animationValues, dynamicStyles.bar]
  )

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.equalizer}>{bars}</View>
    </View>
  )
}
