import React from 'react'
import { ProgressBar as NativeProgressBar, useTheme } from 'react-native-paper'
import { Pressable, PressableProps } from '../Pressable'
import { View } from '../View'
import {
  PlaylistInfoItem,
  SongMeta,
  useDynamicStyles,
  getDynamicStylesInput,
} from 'app/shared/hooks'
import { GestureResponderEvent } from 'react-native'

type ProgressBarProps = {
  activeSong: PlaylistInfoItem
  songMeta: SongMeta
  progress: number
  handleBarPress: (
    e: PressableProps,
    progressBarRef: React.RefObject<View>
  ) => void
}

const BAR_RADIUS = 4
const BAR_MARGIN = 9
const dynamicStylesInput = getDynamicStylesInput((theme) => {
  return {
    barStyle: {
      color: theme.colors.secondary,
      height: 3,
      borderRadius: BAR_RADIUS,
      marginTop: BAR_MARGIN,
      marginBottom: BAR_MARGIN,
    },
  }
})
export const ProgressBar = ({
  activeSong,
  songMeta,
  progress,
  handleBarPress,
}: ProgressBarProps) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  const progressBarRef = React.useRef<View>(null)
  const theme = useTheme()
  return (
    <Pressable
      onPress={(e) => handleBarPress(e, progressBarRef)}
      ref={progressBarRef}
    >
      <NativeProgressBar
        color={theme.colors.secondary}
        progress={progress}
        style={dynamicStyles.barStyle}
      />
    </Pressable>
  )
}
