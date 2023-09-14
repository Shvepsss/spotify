import { useTheme as usePaperTheme } from 'react-native-paper'
import { MD3Theme } from 'app/provider/theme'

export const useTheme = () => {
  const theme = usePaperTheme<MD3Theme>()

  return theme
}
