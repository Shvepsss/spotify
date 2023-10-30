import {
  Button as ButtonNative,
  ButtonProps as NativeButtonProps,
} from 'react-native-paper'
import { ViewStyle } from 'react-native'
import { ColorValue } from 'react-native'

type ButtonProps = Pick<NativeButtonProps, 'children' | 'style'> &
  Pick<ViewStyle, 'borderColor' | 'backgroundColor'> & {
    onPress: () => void
  }

export const Button = ({
  children,
  style,
  borderColor,
  backgroundColor,
  onPress,
}: ButtonProps) => {
  return (
    <ButtonNative
      style={[style, { borderColor, backgroundColor }]}
      onPress={onPress}
    >
      {children}
    </ButtonNative>
  )
}
