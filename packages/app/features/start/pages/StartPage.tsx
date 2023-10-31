import {
  useDynamicStyles,
  getDynamicStylesInput,
  useTheme,
  useSpotifyAuth,
} from 'app/shared/hooks'
import { Button, Typography, View, Image } from 'app/shared/components/ui'

const BUTTON_WIDTH = 337
const BUTTON_HEIGHT = 49
const BUTTON_RADIUS = 25

export function StartPage() {
  const { handleLogin } = useSpotifyAuth()
  console.log(handleLogin)
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
      backgroundColor: theme.colors.background,
    },
    imageContainer: {
      flex: 1,
    },
    imageStyle: {
      flex: 1,
    },
    buttonContainer: {
      justifyContent: 'space-between',
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
