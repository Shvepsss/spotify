import { MD3Theme as BaseMD3Theme, MD3TypescaleKey } from 'react-native-paper'

export type TypographyVariants = 'headlineLarge' | 'bodyMedium' | 'bodySmall'

export type MD3Colors =
  | 'primary'
  | 'background'
  | 'surface'
  | 'surfaceDisabled'
  | 'secondary'

export type MD3Theme = Omit<BaseMD3Theme, 'colors' | 'fonts'> & {
  colors: {
    [colorName in MD3Colors]: string
  }
  fonts: {
    [variant in TypographyVariants]: BaseMD3Theme['fonts'][MD3TypescaleKey]
  }
}
