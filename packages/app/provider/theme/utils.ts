const LINE_HEIGHT_MULTIPLIER = 1.2
export const getFontSizeProps = (fontSize: number) => {
  const lineHeight = Math.ceil(fontSize * LINE_HEIGHT_MULTIPLIER)
  return {
    fontSize: fontSize,
    lineHeight,
  }
}
