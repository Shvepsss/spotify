import { Pressable } from 'react-native'
import { IconLocal, IconLocalProps } from '../IconLocal'
import { ViewProps } from '../View'
type IconButtonProps = Pick<ViewProps, 'style'> &
  IconLocalProps & {
    onPress?: () => void
  }
export const IconButton = ({
  iconName,
  size,
  color,
  onPress,
  style,
}: IconButtonProps) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <IconLocal iconName={iconName} size={size} color={color} />
    </Pressable>
  )
}
