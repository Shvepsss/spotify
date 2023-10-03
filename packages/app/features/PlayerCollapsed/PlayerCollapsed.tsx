import * as React from 'react'
import { GestureResponderEvent, Pressable } from 'react-native'
import { SPOTIFY_SONGS_STATUSES } from 'app/shared/constants/spotify'
import { useTheme } from 'app/shared/hooks/useTheme'
import {
  SongItem,
  ProgressBar,
  View,
  IconButton,
} from 'app/shared/components/ui'
import {
  useDynamicStyles,
  getDynamicStylesInput,
  usePlayer,
} from 'app/shared/hooks'

const P_HORIZONTAL = 17
const P_VERTICAL = 8
const BAR_RADIUS = 4
const BAR_MARGIN = 9
const ICON_MARGIN = 5
const ICON_SIZE = 27

type PlayerCollapsedProps = {
  id: string
  name: string
  withCover: boolean
  author: string
  status: (typeof SPOTIFY_SONGS_STATUSES)[keyof typeof SPOTIFY_SONGS_STATUSES]
  coverImageUrl: string
  album: string
  songUrl: string
}
const dynamicStylesInput = getDynamicStylesInput((theme) => {
  return {
    barStyle: {
      color: theme.colors.secondary,
      height: 3,
      borderRadius: BAR_RADIUS,
      marginTop: BAR_MARGIN,
    },
    songContainer: {
      paddingRight: P_HORIZONTAL,
      paddingLeft: P_HORIZONTAL,
      paddingVertical: P_VERTICAL,
      flex: 1,
    },
    iconButton: {
      margin: ICON_MARGIN,
    },
    buttonsContainer: {
      flexDirection: 'row',
    },
  }
})

const OTHER_SONG = 'https://samplelib.com/lib/preview/mp3/sample-3s.mp3'
export const PlayerCollapsed = ({
  withCover,
  id,
  author,
  name,
  status,
  coverImageUrl,
  album,
  songUrl,
}: PlayerCollapsedProps) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  const theme = useTheme()
  const isChangingPositionRef = React.useRef<boolean>(false)
  const {
    playNewSong,
    songMeta,
    progress,
    activeSong,
    isPlaying,
    toggleSongPlayer,
  } = usePlayer()

  const togglePlay = React.useCallback(() => {
    if (!activeSong) {
      playNewSong(songUrl)
      return
    }

    toggleSongPlayer(activeSong)
  }, [activeSong, toggleSongPlayer, playNewSong, songUrl])
  const onSongPressHandler = React.useCallback(() => {
    console.log(`id:${id}`)
  }, [id])

  const progressBarRef = React.useRef<View>(null)

  const handlePress = React.useCallback(
    (e: GestureResponderEvent) => {
      if (activeSong && songMeta) {
        progressBarRef.current?.measure((_x, _y, progressBarWidth) => {
          // locationX only exists in native, offsetX is for web
          const locationX =
            // @ts-expect-error
            e.nativeEvent.locationX || e.nativeEvent.layerX || 0

          console.log(
            'e.nativeEvent',
            e.nativeEvent,
            `locationX`,
            locationX,
            `progressBarWidth`,
            progressBarWidth
          )
          const newPlaybackPositionRatio = locationX / progressBarWidth
          const newSeconds = songMeta.duration * newPlaybackPositionRatio
          activeSong.howl.seek(newSeconds, activeSong.soundId)
        })
      }
    },
    [activeSong, songMeta]
  )

  const rightComponent = React.useMemo(() => {
    return (
      <View style={dynamicStyles.buttonsContainer}>
        <IconButton
          iconName="monitor"
          size={ICON_SIZE}
          color="secondary"
          onPress={onSongPressHandler}
          style={dynamicStyles.iconButton}
        />
        {isPlaying ? (
          <IconButton
            iconName="pause"
            size={ICON_SIZE}
            color="secondary"
            onPress={togglePlay}
            style={dynamicStyles.iconButton}
          />
        ) : (
          <IconButton
            iconName="play"
            size={ICON_SIZE}
            color="primary"
            onPress={togglePlay}
            style={dynamicStyles.iconButton}
          />
        )}
      </View>
    )
  }, [
    dynamicStyles.buttonsContainer,
    dynamicStyles.iconButton,
    isPlaying,
    onSongPressHandler,
    togglePlay,
  ])

  return (
    <View style={dynamicStyles.songContainer}>
      <SongItem
        id={id}
        author={author}
        name={name}
        album={album}
        status={status}
        coverImageUrl={coverImageUrl}
        isPlaying={isPlaying}
        isSelected
        withCover={withCover}
        rightComponent={rightComponent}
        onPressElement={onSongPressHandler}
      />
      <Pressable onPress={handlePress} ref={progressBarRef}>
        <ProgressBar
          color={theme.colors.secondary}
          progress={progress}
          style={dynamicStyles.barStyle}
        />
      </Pressable>
    </View>
  )
}
