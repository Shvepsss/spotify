import {
  useDynamicStyles,
  getDynamicStylesInput,
  useTheme,
  useSpotifyAuth,
} from 'app/shared/hooks'
import { handler } from '../../../../../apps/next/pages/api'
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
  //will continue this functions lately
  const logIn = () => {}
  const authentication = () => {}
  const signIN = () => {}
  async function ebanayaZalupa() {
    await fetch('api/spotify')
  }
  return (
    <View style={dynamicStyles.pageContainer}>
      <View style={dynamicStyles.imageContainer}>
        {/*
        <Image
          source={require('.assets//Web_Photo_Editor.jpg')}
          alt="logo"
          style={dynamicStyles.imageStyle}

  />*/}
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
          style={dynamicStyles.mainButtonStyle}
          borderColor={theme.colors.primary}
          backgroundColor={theme.colors.primary}
          onPress={() => handleLogin()}
        >
          <Typography color="background" variant="bodyMedium">
            Sign up free
          </Typography>
        </Button>
        <Button
          style={dynamicStyles.mainButtonStyle}
          borderColor={theme.colors.secondary}
          backgroundColor={theme.colors.background}
          onPress={() => authentication()}
        >
          <Typography color="secondary" variant="bodyMedium">
            Continue with Google
          </Typography>
        </Button>
        <Button
          style={dynamicStyles.mainButtonStyle}
          borderColor={theme.colors.secondary}
          backgroundColor={theme.colors.background}
          onPress={() => authentication()}
        >
          <Typography color="secondary" variant="bodyMedium">
            Continue with facebook
          </Typography>
        </Button>
        <Button
          style={dynamicStyles.mainButtonStyle}
          borderColor={theme.colors.secondary}
          backgroundColor={theme.colors.background}
          onPress={() => authentication()}
        >
          <Typography color="secondary" variant="bodyMedium">
            Continue with Apple
          </Typography>
        </Button>
        <Button
          onPress={() => {
            console.log('cheese')
          }}
        >
          <Typography color="secondary" variant="headlineLarge">
            Log in
          </Typography>
        </Button>
      </View>
    </View>
  )
}
