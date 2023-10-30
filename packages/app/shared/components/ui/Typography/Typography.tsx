import { Text, TextProps } from 'react-native-paper'
import { useDynamicStyles } from 'app/shared/hooks'
import { TypographyVariants, MD3Colors } from 'app/provider/theme'
import { TextStyle } from 'react-native'

type TypographyProps = {
  children: React.ReactNode
  variant: TypographyVariants
  color: MD3Colors
  numberOfLines?: number
  style?: TextStyle
}

export const Typography = ({
  children,
  variant,
  color,
  numberOfLines,
  style,
}: TypographyProps) => {
  const dynamicStyles = useDynamicStyles((theme) => ({
    textStyle: {
      color: theme.colors[color],
    },
  }))

  return (
    <Text
      variant={variant}
      style={[dynamicStyles.textStyle, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  )
}
