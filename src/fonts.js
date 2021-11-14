const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

function makeFont({
  fontFamily, fontSize, fontWeight, fontStyle = 'normal',
  lineHeight = 'normal', letterSpacing = 'normal',
  color, ...rest
}) {
  const smooothing = isSafari ? {} : { WebkitFontSmoothing: 'antialiased' }
  return {
    ...smooothing,
    fontFamily,
    fontSize,
    fontWeight,
    fontStyle,
    lineHeight,
    letterSpacing,
    color,
    ...rest,
  }
}


export function sans(options) {
  return makeFont({ fontFamily: '"Source Sans Pro", sans-serif', ...options })
}


export function serif(options) {
  return makeFont({ fontFamily: '"Source Serif Pro", serif', ...options })
}
