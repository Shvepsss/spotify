import { SPOTIFY_SONGS_STATUSES } from 'app/shared/constants'
import {
  useDynamicStyles,
  getDynamicStylesInput,
  PlaylistInfoItem,
  useTheme,
  SongMeta,
} from 'app/shared/hooks'
import { SpotifySong } from 'app/shared/types/spotifySong'
import { IconButton } from '../IconButton'
import { View } from '../View'
import { Image } from '../Image'
import { Typography } from '../Typography'
import { ProgressBar } from '../ProgressBar'
import { PressableProps } from '../Pressable'

const source = 'Mix of the day'
const ICON_SIZE = 27
const MAX_MIN_HEIGHT = 400

type PlayerProps = {
  spotifySongs: SpotifySong[]
  activeSong: PlaylistInfoItem
  progress: number
  songMeta: SongMeta
  togglePlay: (song?: SpotifySong) => void
  isPlaying: boolean
  isLoop: boolean
  handleBarPress: (
    e: PressableProps,
    progressBarRef: React.RefObject<View>
  ) => void
  playNextSong: (spotifySongs: SpotifySong[]) => void
  playPreviousSong: (spotifySongs: SpotifySong[]) => void
  toggleShuffle: () => void
  toggleLoop: () => void
  isShuffle: boolean
}

const dynamicStylesInput = getDynamicStylesInput((theme) => ({
  playerContainer: {
    backgroundColor: theme.colors.background,
    padding: 25,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  songContainer: {
    flexDirection: 'row',
    backgroundColor: 'inherit',
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    maxHeight: MAX_MIN_HEIGHT,
    marginVertical: 40,
  },
  imageStyle: {
    width: '100%',
    minHeight: MAX_MIN_HEIGHT,
    borderRadius: 5,
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    width: '100%',
  },
  progressBarConatiner: {
    width: '100%',
  },
  songInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
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
  handleBarPress,
  playNextSong,
  playPreviousSong,
  toggleLoop,
  toggleShuffle,
  isShuffle,
}: PlayerProps) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  // I'll add logic for these functions in next pr
  const switchDown = () => {}
  const showMore = () => {}
  const onDownloadPress = () => {}
  const theme = useTheme()
  const iconName = isPlaying ? 'pause' : 'play'

  return (
    <View style={dynamicStyles.playerContainer}>
      <View style={dynamicStyles.header}>
        <IconButton
          iconName="close"
          size={ICON_SIZE}
          color="secondary"
          onPress={switchDown}
        />
        <Typography variant="bodyMedium" color="secondary">
          {source}
        </Typography>
        <IconButton
          iconName="menu"
          size={ICON_SIZE}
          color="secondary"
          onPress={showMore}
        />
      </View>
      <View style={dynamicStyles.imageContainer}>
        <Image
          source={{ uri: activeSong?.data.coverImageUrl }}
          alt="songImage"
          resizeMode="contain"
          style={dynamicStyles.imageStyle}
        />
      </View>
      <View style={dynamicStyles.songInfoContainer}>
        <View>
          <Typography variant="bodyMedium" color="secondary">
            {activeSong?.data.name}
          </Typography>
          <Typography variant="bodySmall" color="surfaceDisabled">
            {activeSong?.data.album}
          </Typography>
        </View>
        {activeSong?.data.status === SPOTIFY_SONGS_STATUSES.downloaded ? (
          <IconButton iconName="downloaded" size={ICON_SIZE} color="primary" />
        ) : (
          <IconButton
            iconName="download"
            size={ICON_SIZE}
            color="secondary"
            onPress={onDownloadPress}
          />
        )}
      </View>
      <View style={dynamicStyles.progressBarConatiner}>
        <ProgressBar
          activeSong={activeSong}
          songMeta={songMeta}
          progress={progress}
          handleBarPress={handleBarPress}
        />
      </View>
      <View style={dynamicStyles.control}>
        <IconButton
          iconName="shuffle"
          size={ICON_SIZE}
          color={isShuffle ? 'primary' : 'secondary'}
          onPress={toggleShuffle}
        />
        <IconButton
          iconName="back"
          size={ICON_SIZE}
          color={'secondary'}
          onPress={() => playPreviousSong(spotifySongs)}
        />

        <IconButton
          color={'secondary'}
          iconName={iconName}
          size={ICON_SIZE}
          onPress={() => {
            togglePlay(activeSong.data)
          }}
        />

        <IconButton
          iconName="forward"
          size={ICON_SIZE}
          color={'secondary'}
          onPress={() => playNextSong(spotifySongs)}
        />
        <IconButton
          iconName="repeat"
          size={ICON_SIZE}
          color={isLoop ? 'primary' : 'secondary'}
          onPress={toggleLoop}
        />
      </View>
    </View>
  )
}
