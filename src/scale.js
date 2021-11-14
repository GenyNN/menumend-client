import { Dimensions } from 'react-native'


const { width, height } = Dimensions.get('window')
// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375
const guidelineBaseHeight = 667

const scale = size => width / guidelineBaseWidth * size
const verticalScale = size => height / guidelineBaseHeight * size
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor
const moderateVerticalScale = (size, factor = 0.5) => size + ( verticalScale(size) - size ) * factor
const conditionalSize = (mobileSize, desktopSize, baseWidth = 1000) => width > baseWidth ? desktopSize : mobileSize
const pickStyle = (mobile, desktop, baseWidth = 1000) => width > baseWidth ? desktop: mobile

export { scale, verticalScale, moderateScale, moderateVerticalScale, conditionalSize, pickStyle }
