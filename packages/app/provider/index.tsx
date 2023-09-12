import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'
import { ThemeProvider } from './theme'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <Dripsy>{children}</Dripsy>
      </NavigationProvider>
    </ThemeProvider>
  )
}
