import * as React from 'react'
import { SPOTIFY_SONGS_STATUSES } from 'app/shared/constants/spotify'
import { useTheme } from 'app/shared/hooks/useTheme'
import { useDynamicStyles, getDynamicStylesInput } from 'app/shared/hooks'
import { SongItem } from '../SongItem'
import { ProgressBar } from '../ProgressBar'
import { View } from '../View'

const P_HORIZONTAL = 17
const P_VERTICAL = 8
const BAR_RADIUS = 4
const BAR_MARGIN = 9

type PlayerCollapsedProps = {
  id: string
  name: string
  withCover: boolean
  author: string
  status: (typeof SPOTIFY_SONGS_STATUSES)[keyof typeof SPOTIFY_SONGS_STATUSES]
  coverImageUrl: string
  rightComponent: React.ReactNode
  album: string
  onPressElement: () => void
  isPlaying: boolean
  isSelected: boolean
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
  }
})

export const PlayerCollapsed = ({
  withCover,
  id,
  author,
  name,
  status,
  coverImageUrl,
  rightComponent,
  album,
  onPressElement,
  isPlaying,
  isSelected,
}: PlayerCollapsedProps) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  const theme = useTheme()
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
        withCover={withCover}
        rightComponent={rightComponent}
        isSelected={isSelected}
        onPressElement={onPressElement}
      />
      <View>
        <ProgressBar
          color={theme.colors.secondary}
          progress={0.5}
          style={dynamicStyles.barStyle}
        />
      </View>
    </View>
  )
}
