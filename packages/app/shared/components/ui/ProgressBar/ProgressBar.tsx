import React from 'react'
import { ProgressBar as ProgressBarNative, useTheme } from 'react-native-paper'
import { Pressable, GestureResponderEvent } from 'react-native'
import { View } from '../View'
import {
  PlaylistInfoItem,
  SongMeta,
  useDynamicStyles,
  getDynamicStylesInput,
} from 'app/shared/hooks'

type ProgressBarProps = {
  activeSong: PlaylistInfoItem
  songMeta: SongMeta
  progress: number
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
}: ProgressBarProps) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  const progressBarRef = React.useRef<View>(null)
  const theme = useTheme()

  const handlePress = React.useCallback(
    (e: GestureResponderEvent) => {
      if (activeSong && songMeta) {
        progressBarRef.current?.measure((_x, _y, progressBarWidth) => {
          // locationX only exists in native, offsetX is for web
          const locationX =
            // @ts-expect-error
            e.nativeEvent.locationX || e.nativeEvent.layerX || 0
          const newPlaybackPositionRatio = locationX / progressBarWidth
          const newSeconds = songMeta.duration * newPlaybackPositionRatio
          activeSong.howl.seek(newSeconds, activeSong.soundId)
        })
      }
    },
    [activeSong, songMeta]
  )
  return (
    <Pressable onPress={handlePress} ref={progressBarRef}>
      <ProgressBarNative
        color={theme.colors.secondary}
        progress={progress}
        style={dynamicStyles.barStyle}
      />
    </Pressable>
  )
}
