import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'app/shared/hooks/useTheme'
import { ICON_NAMES } from 'app/shared/constants'
import { MD3Colors } from 'app/provider/theme'

type IconLocalProps = {
  iconName: keyof typeof ICON_NAMES
  size: number
  color?: MD3Colors
}
export const IconLocal = ({ iconName, size, color }: IconLocalProps) => {
  const theme = useTheme()
  return (
    <Icon
      size={size}
      name={ICON_NAMES[iconName]}
      color={color ? theme.colors[color] : undefined}
    />
  )
}
