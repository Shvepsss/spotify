import React from 'react'

import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { MD3Theme } from 'app/provider/theme'
import { useTheme } from './useTheme'

type Styles = ViewStyle | TextStyle | ImageStyle

type NamedStyles<T> = { [P in keyof T]: Styles }

type DynamicStylesInput = Record<string, Styles>

export const getDynamicStylesInput = <T extends DynamicStylesInput>(
  getStyles: (theme: MD3Theme) => T
) => {
  return getStyles
}

export const useDynamicStyles = <T extends NamedStyles<T>>(
  getStyles: (theme: MD3Theme) => T
) => {
  const theme = useTheme()

  const memoedStyles = React.useMemo(() => {
    const stylesProps = getStyles(theme)

    return StyleSheet.create(stylesProps)
  }, [getStyles, theme])

  return memoedStyles
}
