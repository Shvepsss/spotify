import { MD3Theme, Text } from 'react-native-paper'
import { useDynamicStyles } from 'app/shared/hooks'
import { TypographyVariants, MD3Colors } from 'app/provider/theme'

type TypographyProps = {
  children: any
  variant: TypographyVariants
  color: MD3Colors
  numberOfLines?: number
}

export const Typography = ({
  children,
  variant,
  color,
  numberOfLines,
}: TypographyProps) => {
  const dynamicStyles = useDynamicStyles((theme) => ({
    textStyle: {
      color: theme.colors[color],
    },
  }))

  return (
    <Text
      variant={variant}
      style={[dynamicStyles.textStyle]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  )
}
