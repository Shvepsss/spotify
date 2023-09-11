import { Text, MD3Theme } from 'react-native-paper'
import { useDynamicStyles } from 'app/shared/hooks'
type TypographyProps = {
  children: string
  variant: 'headlineLarge' | 'bodyMedium' | 'bodySmall'
  color: 'primary' | 'background' | 'surface' | 'surfaceDisabled' | 'secondary'
}

export const Typography = ({ children, variant, color }: TypographyProps) => {
  const dynamicStyles = useDynamicStyles((theme) => ({
    colorStyle: {
      color: theme.colors[color],
    },
  }))
  return (
    <Text variant={variant} style={[dynamicStyles.colorStyle]}>
      {children}
    </Text>
  )
}
