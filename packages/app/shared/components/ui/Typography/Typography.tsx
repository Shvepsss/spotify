import { Text } from 'react-native-paper'
import { useDynamicStyles } from 'app/shared/hooks'
import { TypographyVariants, MD3Colors } from 'app/provider/theme'

type TypographyProps = {
  children: string
  variant: TypographyVariants
  color: MD3Colors
}

export const Typography = ({ children, variant, color }: TypographyProps) => {
  const dynamicStyles = useDynamicStyles((theme) => ({
    colorStyle: {
      color: theme.colors[color],
    },
  }))

  return (
    <Text
      variant={variant}
      style={[dynamicStyles.colorStyle]}
      numberOfLines={1}
    >
      {children}
    </Text>
  )
}
