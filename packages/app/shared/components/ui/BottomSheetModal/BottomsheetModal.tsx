import React from 'react'

import {
  BottomSheet,
  BottomSheetRef,
  BottomSheetProps,
} from 'react-spring-bottom-sheet'

import {
  BottomSheetModalPropsBase,
  BOTTOM_SHEET_MODAL_CONTENT_HEIGHT_VALUE,
} from './BottomSheetModalProps'

export type BottomSheetModalProps = BottomSheetModalPropsBase

// eslint-disable-next-line react/display-name
export const BottomSheetModal = React.forwardRef(
  (
    {
      snapPoints,
      footer,
      backgroundStyle,
      withOverlay = true,
      ...props
    }: BottomSheetModalProps,
    ref: React.ForwardedRef<BottomSheetRef>
  ) => {
    const getSnapPoints = React.useCallback<
      NonNullable<BottomSheetProps['snapPoints']>
    >(
      (state) => {
        const newSnapPoints = snapPoints.map((point) => {
          if (point === BOTTOM_SHEET_MODAL_CONTENT_HEIGHT_VALUE) {
            return state.minHeight
          }

          if (typeof point === 'number') {
            return point
          }

          const percentageStr = point.replace('%', '')
          const percentage = Number(percentageStr)

          return Math.ceil((state.maxHeight * percentage) / 100)
        })
        return newSnapPoints
      },
      [snapPoints]
    )
    return (
      <BottomSheet
        open
        ref={ref}
        skipInitialTransition
        {...props}
        footer={footer}
        snapPoints={getSnapPoints}
        suppressHydrationWarning
        // @ts-ignore, this is a React component but RN styles should work regardless.
        style={backgroundStyle}
        blocking={!withOverlay}
      />
    )
  }
)
