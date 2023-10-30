import { View } from '../View'
import { Image } from '../Image'
import { Typography } from '../Typography'
import { useDynamicStyles, getDynamicStylesInput } from 'app/shared/hooks'

const ELEMENT_HEIGTH = 70
const ELEMENT_WIDTH = 80
const RADIUS = 10
const CONTAINER_WIDTH = 170

const dynamicStylesInput = getDynamicStylesInput((theme) => {
  return {
    container: {
      maxHeight: ELEMENT_HEIGTH,
      width: CONTAINER_WIDTH,
      backgroundColor: theme.colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: RADIUS,
    },
    imageContainer: {
      width: ELEMENT_WIDTH,
      height: ELEMENT_HEIGTH,
      marginRight: RADIUS,
    },
    imageStyle: {
      height: ELEMENT_HEIGTH,
      width: ELEMENT_WIDTH,
      resizeMode: 'cover',
      borderBottomLeftRadius: RADIUS,
      borderTopLeftRadius: RADIUS,
    },
  }
})

export type CurrentPlaylistsProps = {
  name: string
  coverImageUrl: string
}
export const CurrentUserPLaylist = ({
  name,
  coverImageUrl,
}: CurrentPlaylistsProps) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.imageContainer}>
        <Image
          alt="Last listened album/playlist/author"
          source={{ uri: coverImageUrl }}
          style={dynamicStyles.imageStyle}
        />
      </View>
      <Typography variant="bodySmall" color="secondary">
        {name}
      </Typography>
    </View>
  )
}
