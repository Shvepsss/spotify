import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MD3Theme, useTheme } from 'react-native-paper'
import { ICON_NAMES } from 'app/shared/constants'

type IconLocalProps = {
  iconName: keyof typeof ICON_NAMES
  size: number
  color?: 'primary' | 'background' | 'surface' | 'surfaceDisabled' | 'secondary'
}
export const IconLocal = ({ iconName, size, color }: IconLocalProps) => {
  const { colors } = useTheme()

  return (
    <Icon
      size={size}
      name={ICON_NAMES[iconName]}
      color={color ? colors[color] : undefined}
    />
  )
}
