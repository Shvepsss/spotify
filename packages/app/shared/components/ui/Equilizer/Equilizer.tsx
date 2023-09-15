import React, { useEffect } from 'react'
import { View, Animated } from 'react-native'
import { useDynamicStyles, getDynamicStylesInput } from 'app/shared/hooks'

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
      height: 10,
    },
    bar: {
      width: 2,
      marginRight: 2,
      backgroundColor: theme.colors.primary,
    },
    button: {
      marginTop: 20,
      backgroundColor: 'lightblue',
      padding: 10,
    },
  }
})

export const Equalizer = ({ isPlaying }) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  const animationValues = Array.from(
    { length: 3 },
    (_, i) => new Animated.Value(i * 0.1)
  )

  const runAnimation = (value, index) => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(value, {
          toValue: 3,
          duration: 350,
          useNativeDriver: false,
        }),
        Animated.timing(value, {
          toValue: 0,
          duration: 350,
          useNativeDriver: false,
        }),
      ])
    )

    animation.start()

    return () => animation.reset()
  }

  useEffect(() => {
    if (isPlaying) {
      animationValues.forEach((value, i) => {
        value.setValue(0.1 * i)
      })
      animationValues.forEach((value, index) => {
        runAnimation(value, index)
      })
      return () => {
        animationValues.forEach((value) => {
          Animated.timing(value, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          })
        })
      }
    }
  }, [isPlaying])

  const bars = animationValues.map((value, index) => (
    <Animated.View
      key={index}
      style={[
        dynamicStyles.bar,
        {
          height: value.interpolate({
            inputRange: [0, 1],
            outputRange: ['1px', '4px'],
          }),
        },
      ]}
    />
  ))

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.equalizer}>{bars}</View>
    </View>
  )
}
