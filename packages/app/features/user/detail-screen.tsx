import { View, Text } from 'dripsy'
import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import { Button } from 'app/shared/components/ui'
import { useNavigation } from 'app/shared/hooks'
import { APP_URL } from 'app/shared/constants'
const { useParam } = createParam<{ id: string }>()

export function UserDetailScreen() {
  const [id] = useParam('id')
  const navigation = useNavigation()
  const redirectToHome = () => {
    navigation.push(APP_URL.splash)
  }

  return (
    <View sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        sx={{ textAlign: 'center', mb: 16, fontWeight: 'bold' }}
      >{`User ID: ${id}`}</Text>
      <Button onPress={redirectToHome}>
        <Text>Go Home</Text>
      </Button>
    </View>
  )
}
