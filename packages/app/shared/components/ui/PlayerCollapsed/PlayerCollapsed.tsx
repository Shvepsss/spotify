import React from 'react'
import { GestureResponderEvent } from 'react-native'
import {
  SongItem,
  SongItemProps,
  ProgressBar,
  View,
  Pressable,
  PlayerCollapsedRightComponent,
} from 'app/shared/components/ui'
import {
  useDynamicStyles,
  getDynamicStylesInput,
  usePlayer,
  useTheme,
  PlaylistInfoItem,
  SongMeta,
} from 'app/shared/hooks'
import { SpotifySong } from 'app/shared/types/spotifySong'

const P_HORIZONTAL = 17
const P_TOP = 8
const P_BOTTOM = 14

type PlayerCollapsedProps = SpotifySong & {
  withCover: boolean
  isPlaying: boolean
  togglePlay: (song: SpotifySong) => void
  activeSong: PlaylistInfoItem
  songMeta: SongMeta
  progress: number
  handleBarPress: (
    e: GestureResponderEvent,
    progressBarRef: React.RefObject<View>
  ) => void
}
const dynamicStylesInput = getDynamicStylesInput((theme) => {
  return {
    songContainer: {
      paddingRight: P_HORIZONTAL,
      paddingLeft: P_HORIZONTAL,
      paddintTop: P_TOP,
      paddingBottom: P_BOTTOM,
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  }
})

export const PlayerCollapsed = ({
  id,
  author,
  name,
  status,
  coverImageUrl,
  album,
  songUrl,
  withCover = true,
  isPlaying,
  togglePlay,
  activeSong,
  songMeta,
  progress,
  handleBarPress,
}: PlayerCollapsedProps) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  const theme = useTheme()
  const onSongPressHandler = React.useCallback(() => {
    console.log(`id:${id}`)
  }, [id])

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
        isSelected={false}
        withCover={withCover}
        withStatus={false}
        rightComponent={
          <PlayerCollapsedRightComponent
            isPlaying={isPlaying}
            onSongPressHandler={onSongPressHandler}
            togglePlay={() =>
              togglePlay({
                id,
                author,
                name,
                status,
                coverImageUrl,
                album,
                songUrl,
              })
            }
          />
        }
        onPressElement={onSongPressHandler}
      />

      {handleBarPress && (
        <ProgressBar
          activeSong={activeSong}
          songMeta={songMeta}
          progress={progress}
          handleBarPress={handleBarPress}
        />
      )}
    </View>
  )
}
