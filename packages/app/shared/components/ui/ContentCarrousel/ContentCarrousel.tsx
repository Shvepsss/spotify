import { Pressable } from 'react-native'
import { Typography } from '../Typography'
import { Image } from '../Image'
import { useDynamicStyles, getDynamicStylesInput } from 'app/shared/hooks'

type contentProps = {
  name: string
  artist: string
  imageUri: string
  href: string
  chooseElement: (par: string) => void
}
const IMAGE_SIZE = 154
const dynamicStylesInput = getDynamicStylesInput((theme) => {
  return {
    container: {
      gap: 10,
      marginBottom: 15,
      marginRight: 20,
    },
    imageStyle: {
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
    },
  }
})

export const ContentCarrousel = ({
  name,
  artist,
  imageUri,
  href,
  chooseElement,
}: contentProps) => {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  return (
    <Pressable
      style={dynamicStyles.container}
      onPress={() => chooseElement(href)}
    >
      <Image source={{ uri: imageUri }} style={dynamicStyles.imageStyle} />
      <Typography variant="bodyMedium" color="secondary">
        {name}
      </Typography>
      <Typography variant="bodySmall" color="surfaceDisabled">
        {artist}
      </Typography>
    </Pressable>
  )
}
