import {
  PaperProvider,
  MD3DarkTheme as DefaultTheme,
  configureFonts,
} from 'react-native-paper'
import { MD3Colors, MD3Theme } from './types'
import { getFontSizeProps } from './utils'
export * from './types'

const customColors: { [colorName in MD3Colors]: string } = {
  primary: '#1ED760',
  background: '#121212',
  surface: '#282828',
  surfaceDisabled: '#777777',
  secondary: '#FFFFFF',
}

const typographyVariants: MD3Theme['fonts'] = {
  headlineLarge: {
    ...DefaultTheme.fonts.headlineLarge,
    ...getFontSizeProps(90),
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  bodyMedium: {
    ...DefaultTheme.fonts.bodyMedium,
    ...getFontSizeProps(90),
    fontStyle: 'normal',
    fontWeight: '600',
  },
  bodySmall: {
    ...DefaultTheme.fonts.bodySmall,
    ...getFontSizeProps(90),
    fontWeight: '500',
    fontStyle: 'normal',
  },
}
const theme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...customColors,
  },
  fonts: {
    ...DefaultTheme.fonts,
    ...configureFonts({ config: typographyVariants }),
  },
}

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>
}
