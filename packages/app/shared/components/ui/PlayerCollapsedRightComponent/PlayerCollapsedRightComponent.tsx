import { View } from '../View'
import { IconButton } from '../IconButton'
import { useDynamicStyles, getDynamicStylesInput } from 'app/shared/hooks'

type PlayerCollapsedRightComponentProps = {
  isPlaying: boolean
  onSongPressHandler: () => void
  togglePlay: () => void
}

const ICON_MARGIN = 5
const ICON_SIZE = 27

const dynamicStylesInput = getDynamicStylesInput((theme) => {
  return {
    iconButton: {
      margin: ICON_MARGIN,
    },
    buttonsContainer: {
      flexDirection: 'row',
    },
  }
})

export const PlayerCollapsedRightComponent = ({
  isPlaying,
  togglePlay,
  onSongPressHandler,
}: PlayerCollapsedRightComponentProps) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  const iconName = isPlaying ? 'pause' : 'play'
  return (
    <View style={dynamicStyles.buttonsContainer}>
      <IconButton
        iconName="monitor"
        size={ICON_SIZE}
        color="secondary"
        onPress={onSongPressHandler}
        style={dynamicStyles.iconButton}
      />
      <IconButton
        iconName={iconName}
        size={ICON_SIZE}
        color="secondary"
        onPress={togglePlay}
        style={dynamicStyles.iconButton}
      />
    </View>
  )
}
