import { useDynamicStyles, useTheme, useSpotifyAuth } from 'app/shared/hooks'
import { handler } from '../../../../../apps/next/pages/api'
import { Button, Typography, View, Image } from 'app/shared/components/ui'

const BUTTON_WIDTH = 337
const BUTTON_HEIGHT = 49
const BUTTON_RADIUS = 25
const IMAGE_SIZE = 100

export function StartPage() {
  const { handleLogin } = useSpotifyAuth()
  const theme = useTheme()
  const dynamicStyles = useDynamicStyles((theme) => ({
    mainButtonStyle: {
      width: BUTTON_WIDTH,
      height: BUTTON_HEIGHT,
      borderRadius: BUTTON_RADIUS,
      borderStyle: 'solid',
      borderWidth: 1,
      alignItems: 'center',
      margin: 10,
      justifyContent: 'center',
    },
    pageContainer: {
      flex: 1,
      backgroundImage:
        'linear-gradient(to bottom, #121212 0%, #0F833B 60%, #121212 100%)',
      alignItems: 'center',
      gap: 20,
    },
    imageContainer: {
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column-reverse',
    },
    imageStyle: {
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
      sresizeMode: 'cover',
    },
    buttonContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      margin: 15,
      marginBottom: 20,
    },
    textContainer: {
      alignItems: 'center',
      margin: 15,
    },
  }))

  return (
    <View style={dynamicStyles.pageContainer}>
      <View style={dynamicStyles.imageContainer}>
        <Image
          src={require('./logo.webp')}
          style={dynamicStyles.imageStyle}
          alt="logo"
        />
      </View>
      <View style={dynamicStyles.textContainer}>
        <Typography color="secondary" variant="headlineLarge">
          Millions of Songs
          <br />
          Free on Spotify.
        </Typography>
      </View>
      <View style={dynamicStyles.buttonContainer}>
        <Button
          onPress={() => handleLogin()}
          style={dynamicStyles.mainButtonStyle}
          borderColor={theme.colors.primary}
          backgroundColor={theme.colors.primary}
        >
          <Typography color="background" variant="bodyMedium">
            Log in
          </Typography>
        </Button>
      </View>
    </View>
  )
}
