import {
  PaperProvider,
  MD3DarkTheme as DefaultTheme,
  MD3Theme,
} from 'react-native-paper'
const FONT_SIZE = 90
const LINE_HEIGHT_MULTIPLIER = 1.2
const LINE_HEIGHT = FONT_SIZE * LINE_HEIGHT_MULTIPLIER
const theme: MD3Theme = {
  ...DefaultTheme,
  // Specify custom property
  colors: {
    ...DefaultTheme.colors,
    primary: '#1ED760',
    background: '#121212',
    surface: '#282828',
    surfaceDisabled: '#777777',
    secondary: '#FFFFFF',
  },

  fonts: {
    ...DefaultTheme.fonts,
    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontSize: FONT_SIZE,
      fontStyle: 'normal',
      fontWeight: 'bold',
      lineHeight: LINE_HEIGHT,
    },
    bodyMedium: {
      ...DefaultTheme.fonts.bodyMedium,
      fontSize: FONT_SIZE,
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: LINE_HEIGHT,
    },
    bodySmall: {
      ...DefaultTheme.fonts.bodyMedium,
      fontSize: FONT_SIZE,
      fontWeight: '500',
      fontStyle: 'normal',
      lineHeight: LINE_HEIGHT,
    },
  },

  // Specify custom property in nested object
}

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>
}
