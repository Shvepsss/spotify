import React from 'react'
import { SPOTIFY_SONGS_STATUSES, SpotifySongStatus } from 'app/shared/constants'
import { useDynamicStyles, getDynamicStylesInput } from 'app/shared/hooks'
import { View } from '../View'
import { Image } from '../Image'
import { Typography } from '../Typography'
import { ListItem } from '../ListItem'
import { Equalizer } from '../Equilizer'
import { IconLocal } from '../IconLocal'

const IMAGE_SIZE = 47
const STATUS_ICON_SIZE = 12
const RESET_DIMENSION = 0
const DOT_SYMBOL = '\u25CF'

export type SongItemProps = {
  id: string
  name: string
  author: string
  status: SpotifySongStatus
  withCover: boolean
  coverImageUrl?: string
  album?: string
  onPressElement?: () => void
  isSelected: boolean
  isPlaying: boolean
  rightComponent: React.ReactNode
}
const dynamicStylesInput = getDynamicStylesInput((theme) => ({
  listIem: {
    paddingTop: RESET_DIMENSION,
    paddingBottom: RESET_DIMENSION,
    paddingRight: RESET_DIMENSION,
  },
  songImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  songTitle: {
    flexDirection: 'row',
    flex: 1,
  },
}))

// eslint-disable-next-line react/display-name
export const SongItem = React.memo(
  ({
    name,
    coverImageUrl,
    author,
    status,
    album,
    id,
    isSelected,
    isPlaying,
    onPressElement,
    rightComponent,
    withCover,
  }: SongItemProps) => {
    const dynamicStyles = useDynamicStyles(dynamicStylesInput)
    const shouldShowEqualizer = isSelected
    const description = [album, author].filter(Boolean).join(` ${DOT_SYMBOL} `)

    return (
      <ListItem
        onPress={onPressElement}
        style={dynamicStyles.listIem}
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
            {description}
          </Typography>
        }
        right={() => (
          <View style={dynamicStyles.menuButton}>{rightComponent}</View>
        )}
      />
    )
  }
)
