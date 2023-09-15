import { Pressable } from 'react-native'
import { useDynamicStyles, getDynamicStylesInput } from 'app/shared/hooks'
import { SPOTIFY_SONGS_STATUSES } from 'app/shared/constants/spotify'
import {
  ListItem,
  Image,
  View,
  Typography,
  Equalizer,
  IconLocal,
} from '../index'

const IMAGE_SIZE = 47
const P_HORIZONTAL = 17
const P_VERTICAL = 8
const STATUS_ICON_SIZE = 12
const DOT_SYMBOL = '\u25CF'

type SongItemProps = {
  id: string
  name: string
  author: string
  status: (typeof SPOTIFY_SONGS_STATUSES)[keyof typeof SPOTIFY_SONGS_STATUSES]
  withCover: boolean
  coverImageUrl?: string
  album: string
  onPress: () => void
  onMenuPress?: () => void
  isSelected: boolean
  isPlaying: boolean
  rightComponent: React.ReactNode
}
const dynamicStylesInput = getDynamicStylesInput((theme) => ({
  songItemContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
  },
  songInfoContainer: {
    paddingRight: P_HORIZONTAL,
    paddingLeft: P_HORIZONTAL,
    paddingVertical: P_VERTICAL,
    flex: 1,
  },
  songImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  songTitle: {
    flexDirection: 'row',
    flex: 1,
  },
}))

export const SongItem = ({
  name,
  coverImageUrl,
  author,
  status,
  album,
  id,
  isSelected,
  isPlaying,
  onPress,
  onMenuPress,
  rightComponent,
  withCover,
}: SongItemProps) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  const shouldShowEqualizer = isPlaying || isSelected
  return (
    <View style={dynamicStyles.songItemContainer}>
      <ListItem
        onPress={onPress}
        style={[dynamicStyles.songInfoContainer]}
        title={
          <View style={dynamicStyles.songTitle}>
            {shouldShowEqualizer ? <Equalizer isPlaying={isPlaying} /> : null}
            <Typography
              variant="bodyMedium"
              color={isSelected ? 'primary' : 'secondary'}
            >
              {name}
            </Typography>
          </View>
        }
        left={() =>
          withCover ? (
            <Image
              alt="Album"
              source={{ uri: coverImageUrl }}
              style={dynamicStyles.songImage}
            />
          ) : null
        }
        description={
          <Typography variant="bodySmall" color="surfaceDisabled">
            {status === SPOTIFY_SONGS_STATUSES.downloaded ? (
              <IconLocal
                size={STATUS_ICON_SIZE}
                iconName="downloaded"
                color="primary"
              />
            ) : null}
            {album}
            {DOT_SYMBOL}
            {author}
          </Typography>
        }
        right={() => (
          <Pressable onPress={onMenuPress} style={dynamicStyles.menuButton}>
            {rightComponent}
          </Pressable>
        )}
      />
    </View>
  )
}
