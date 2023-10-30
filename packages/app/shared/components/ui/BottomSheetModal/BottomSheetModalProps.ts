import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export type BottomSheetModalPropsBase = {
  snapPoints: Array<string | number>
  enableDismissOnClose?: boolean
  onDismiss?: () => void
  backgroundStyle?: StyleProp<ViewStyle>
  children: React.ReactNode
  footer?: React.ReactNode
  enablePanDownToClose?: boolean
  open?: boolean
  handleIndicatorStyle?: ViewStyle
  withOverlay?: boolean
  onSpringStart?: (event) => void
}

export const BOTTOM_SHEET_MODAL_CONTENT_HEIGHT_VALUE = 'CONTENT_HEIGHT'
