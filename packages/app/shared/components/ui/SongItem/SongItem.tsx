import { View, Text } from 'dripsy'
import { Typography } from '../Typography'
import { useDynamicStyles, getDynamicStylesInput } from 'app/shared/hooks'
import { ListItem, Image } from '../index'
import { Pressable } from 'react-native'
import { GestureResponderEvent } from 'react-native'
import { Equalizer } from '../Equilizer'
import { IconLocal } from '../IconLocal'

const IMAGE_SIZE = 47
const P_HORIZONTAL = 17
const P_VARTICAL = 8

type SongItemProps = {
  id: string
  name: string
  author: string
  status: string
  coverImageUrl: string
  album: string
  onPress: (event: GestureResponderEvent) => void
  onMenuPress: () => void
  isSelected: boolean
  isPlaying: boolean
}
const dynamicStylesInput = getDynamicStylesInput((theme) => ({
  songItemContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
  },
  songInfoContainer: {
    paddingRight: 17,
    paddingHorizontal: P_HORIZONTAL,
    paddingVertical: P_VARTICAL,
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
}: SongItemProps) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)

  return (
    <View style={dynamicStyles.songItemContainer}>
      <ListItem
        onPress={onPress}
        style={[dynamicStyles.songInfoContainer]}
        title={
          <View style={dynamicStyles.songTitle}>
            {isPlaying || isSelected ? (
              <Equalizer isPlaying={isPlaying} />
            ) : null}
            <Typography
              variant="bodyMedium"
              color={isSelected ? 'primary' : 'secondary'}
            >
              {name}
            </Typography>
          </View>
        }
        left={() => (
          <Image
            alt="Album"
            source={{ uri: coverImageUrl }}
            style={dynamicStyles.songImage}
          />
        )}
        description={
          <Typography variant="bodySmall" color="surfaceDisabled">
            {status === 'downloaded' ? (
              <IconLocal size={12} iconName="downloaded" color="primary" />
            ) : null}
            {album}
            {'\u25CF'}
            {author}
          </Typography>
        }
        right={() => (
          <Pressable
            onPress={() => {
              onMenuPress()
            }}
            style={dynamicStyles.menuButton}
          >
            <IconLocal iconName="menu" size={27} color="surfaceDisabled" />
          </Pressable>
        )}
      />
    </View>
  )
}
