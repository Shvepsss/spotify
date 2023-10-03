import { SPOTIFY_SONGS_STATUSES } from 'app/shared/constants'
import {
  useDynamicStyles,
  getDynamicStylesInput,
  PlaylistInfoItem,
  useTheme,
  SongMeta,
} from 'app/shared/hooks'
import { IconButton } from '../IconButton'
import { View } from '../View'
import { Image } from '../Image'
import { Typography } from '../Typography'
import { ProgressBar } from '../ProgressBar'
import { useState } from 'react'

const source = 'Mix of the day'

export type SpotifySong = {
  id: string
  name: string
  author: string
  status: (typeof SPOTIFY_SONGS_STATUSES)[keyof typeof SPOTIFY_SONGS_STATUSES]
  coverImageUrl: string
  album: string
  songUrl: string
}
type PlayerProps = {
  spotifySongs: SpotifySong[]
  activeSong: PlaylistInfoItem
  progress: number
  songMeta: SongMeta
  togglePlay: (song?: SpotifySong) => void
  isPlaying: boolean
  isLoop: boolean
  setIsLoop: (isLoop: boolean) => void
}

const dynamicStylesInput = getDynamicStylesInput((theme) => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  songContainer: {
    flexDirection: 'row',
    backgroundColor: 'inherit',
  },
  imageContainer: {
    padding: 25,
    alignItems: 'center',
    flex: 1,
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    width: '100%',
  },
}))
export const Player = ({
  spotifySongs,
  activeSong,
  progress,
  songMeta,
  togglePlay,
  isPlaying,
  isLoop,
  setIsLoop,
}: PlayerProps) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  // I'll add logic for this functions in next pr
  const switchDown = () => {}
  const showMore = () => {}

  const onDownloadPress = () => {}
  const theme = useTheme()
  const [isShuffle, setIsShuffle] = useState(false)

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle)
  }
  const getRandomIndex = () => {
    return Math.floor(Math.random() * spotifySongs.length)
  }
  const toggleLoop = () => {
    setIsLoop(!isLoop)
  }
  const playnextSong = () => {
    const current_Index = spotifySongs.findIndex(
      (el) => el.id === activeSong.data.id
    )
    if (isShuffle) {
      let index = getRandomIndex()
      if (index === current_Index) {
        index += 1
      }
      if (index > spotifySongs.length - 1) {
        index = 0
      }
      const nextSong = spotifySongs[index]
      togglePlay(nextSong)
      return
    }
    let nextIndex = current_Index + 1
    if (nextIndex > spotifySongs.length - 1) {
      nextIndex = 0
    }
    const nextSong = spotifySongs[nextIndex]
    togglePlay(nextSong)
  }

  const playPreviousSong = () => {
    const currentIndex = spotifySongs.findIndex(
      (el) => el.id === activeSong.data.id
    )
    const previousIndex = currentIndex - 1
    if (previousIndex < 0) {
      if (!spotifySongs[0]) {
        return
      }
      activeSong.howl.seek(0, activeSong.soundId)

      return
    }
    const previousSong = spotifySongs[previousIndex]
    togglePlay(previousSong)
  }

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        padding: 20,
        flex: 1,
      }}
    >
      <View style={dynamicStyles.header}>
        <IconButton
          iconName="close"
          size={27}
          color="secondary"
          onPress={() => switchDown}
        />
        <Typography variant="bodyMedium" color="secondary">
          {source}
        </Typography>
        <IconButton
          iconName="menu"
          size={27}
          color="secondary"
          onPress={() => showMore}
        />
      </View>
      <View style={dynamicStyles.imageContainer}>
        <Image
          source={{ uri: activeSong?.data.coverImageUrl }}
          alt="songImage"
          resizeMode="contain"
          style={{ width: '100%', height: 500, borderRadius: 5 }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Typography variant="bodyMedium" color="secondary">
              {activeSong?.data.name}
            </Typography>
            <Typography variant="bodySmall" color="surfaceDisabled">
              {activeSong?.data.album}
            </Typography>
          </View>
          {activeSong?.data.status === SPOTIFY_SONGS_STATUSES.downloaded ? (
            <IconButton iconName="downloaded" size={27} color="primary" />
          ) : (
            <IconButton
              iconName="download"
              size={27}
              color="secondary"
              onPress={onDownloadPress}
            />
          )}
        </View>
        <View style={{ width: '100%' }}>
          <ProgressBar
            activeSong={activeSong}
            songMeta={songMeta}
            progress={progress}
          />
        </View>
        <View style={dynamicStyles.control}>
          <IconButton
            iconName="shuffle"
            size={27}
            color={isShuffle ? 'primary' : 'secondary'}
            onPress={() => toggleShuffle()}
          />
          <IconButton
            iconName="back"
            size={27}
            color={'secondary'}
            onPress={() => playPreviousSong()}
          />
          {isPlaying ? (
            <IconButton
              color={'secondary'}
              iconName="pause"
              size={27}
              onPress={() => {
                togglePlay(activeSong.data)
              }}
            />
          ) : (
            <IconButton
              iconName="play"
              size={27}
              color={'secondary'}
              onPress={() => {
                togglePlay(activeSong.data)
              }}
            />
          )}
          <IconButton
            iconName="forward"
            size={27}
            color={'secondary'}
            onPress={() => playnextSong()}
          />
          <IconButton
            iconName="repeat"
            size={27}
            color={isLoop ? 'primary' : 'secondary'}
            onPress={() => toggleLoop()}
          />
        </View>
      </View>
    </View>
  )
}
