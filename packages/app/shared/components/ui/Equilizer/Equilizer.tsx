import { Animated } from 'react-native'
import React, { useEffect } from 'react'
import { useDynamicStyles, getDynamicStylesInput } from 'app/shared/hooks'
import { View } from '../View'

const EQUILIZER_AREA_HEIGHT = 10
const BAR_WIDTH = 2
const BAR_MAX_HEIGHT = 10
const TRANSITION_TIME = 350

type EqualizerProps = {
  isPlaying: boolean
}

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
        duration: TRANSITION_TIME,
        useNativeDriver: true,
      }),
      Animated.timing(value, {
        toValue: 0,
        duration: TRANSITION_TIME,
        useNativeDriver: true,
      }),
    ])
  )

  animation.start()

  return () => animation.reset()
}

// eslint-disable-next-line react/display-name
export const Equalizer = React.memo(({ isPlaying }: EqualizerProps) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  const animationValues = React.useMemo(
    () => Array.from({ length: 3 }, (_, i) => new Animated.Value(i * 0.1)),
    []
  )
  useEffect(() => {
    if (isPlaying) {
      animationValues.forEach((value, index) => {
        value.setValue(0)

        runAnimation(value, index)
      })
    } else {
      animationValues.forEach((value) => {
        const animation = Animated.timing(value, {
          toValue: 0,
          duration: TRANSITION_TIME,
          useNativeDriver: true,
        })

        animation.start()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
})
