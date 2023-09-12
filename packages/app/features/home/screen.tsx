import { Text, useSx, View, H1, P, Row, A } from 'dripsy'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti'
import {
  useDynamicStyles,
  getDynamicStylesInput,
  useNavigation,
} from 'app/shared/hooks'
import { Button, Typography } from 'app/shared/components/ui'
import { APP_URL } from 'app/shared/constants'

const BUTTON_SIZE = 100
const dynamicStylesInput = getDynamicStylesInput((theme) => {
  return {
    wrapper: {
      backgroundColor: theme.colors.error,
    },
    button: {
      height: BUTTON_SIZE,
      width: BUTTON_SIZE,
    },
  }
})

export function HomeScreen() {
  const dynamicStyles = useDynamicStyles(dynamicStylesInput)
  const sx = useSx()
  const navigation = useNavigation()
  const redirectToUser = (userId: string) => {
    navigation.push(APP_URL.user.replace(':id', userId))
  }

  return (
    <View
      sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', p: 16 }}
      style={dynamicStyles.wrapper}
    >
      <Typography color="primary" variant="bodySmall">
        primary
      </Typography>
      <Typography color="background" variant="bodyMedium">
        background
      </Typography>
      <Typography color="surface" variant="headlineLarge">
        surface
      </Typography>
      <Typography color="surfaceDisabled" variant="bodyMedium">
        surfaceDisabled
      </Typography>
      <Typography color="secondary" variant="bodyMedium">
        secondary
      </Typography>
      <H1 sx={{ fontWeight: '800' }}>Welcome to Solito.</H1>
      <View sx={{ maxWidth: 600 }}>
        <P sx={{ textAlign: 'center' }}>
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </P>
        <P sx={{ textAlign: 'center' }}>
          Solito is made by{' '}
          <A
            href="https://twitter.com/fernandotherojo"
            // @ts-expect-error react-native-web only types
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
            sx={{ color: 'blue' }}
          >
            Fernando Rojo
          </A>
          .
        </P>
      </View>
      <View sx={{ height: 32 }} />
      <Row>
        <TextLink
          href="/user/fernando"
          textProps={{
            style: sx({ fontSize: 16, fontWeight: 'bold', color: 'blue' }),
          }}
        >
          Regular Link
        </TextLink>
        <Button
          onPress={() => redirectToUser('Nsa')}
          style={[dynamicStyles.wrapper, { backgroundColor: 'white' }]}
        >
          <Typography color="primary" variant="headlineLarge">
            Regular Link Test
          </Typography>
        </Button>
        <View sx={{ width: 32 }} />
        <MotiLink
          href="/user/fernando"
          animate={({ hovered, pressed }) => {
            'worklet'

            return {
              scale: pressed ? 0.95 : hovered ? 1.1 : 1,
              rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
            }
          }}
          from={{
            scale: 0,
            rotateZ: '0deg',
          }}
          transition={{
            type: 'timing',
            duration: 150,
          }}
        >
          <Text
            selectable={false}
            sx={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}
          >
            Moti Link
          </Text>
        </MotiLink>
      </Row>
    </View>
  )
}
