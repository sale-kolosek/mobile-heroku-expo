import { Dimensions, PixelRatio, Platform, StyleSheet } from "react-native"

const { width, height } = Dimensions.get("window")
export const SCREEN_WIDTH = Dimensions.get("screen").width
export const SCREEN_HEIGHT = Dimensions.get("screen").height

const realWidth = height > width ? width : height
const realHeight = height > width ? height : width

const relativeWidth = (num) => (realWidth * num) / 100
const relativeHeight = (num) => (realHeight * num) / 100

/**
 * Gets scaled font size for different devices or different themes
 *
 * @param {number} fontSize
 * @returns {number}
 */

function getScaledFont(fontSize) {
  const scale = width / 320
  const newSize = fontSize * scale
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

const isTablet = () => {
  const pixelDensity = PixelRatio.get()
  const adjustedWidth = width * pixelDensity
  const adjustedHeight = height * pixelDensity
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true
  }
  return pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
}

const responsiveFontSize = (fontSize) => {
  const divider = isTablet() ? 600 : 375
  return Math.round((fontSize * realWidth) / divider)
}

/**
 * Formats margins from CSS style declaration
 *
 * @param {string} margin - eg. '10 20 10 20'
 * @returns {Object}
 */
function getMargins(margin) {
  if (!margin) return getMargins("0 0 0 0")

  const margins = margin.split(" ")
  if (margins.length !== 4) return getMargins()

  return StyleSheet.create({
    margins: {
      marginTop: Number(margins[0]),
      marginRight: Number(margins[1]),
      marginBottom: Number(margins[2]),
      marginLeft: Number(margins[3]),
    },
  }).margins
}

/**
 * Formats padding from CSS style declaration
 *
 * @param {string} padding - eg. '10 20 10 20'
 * @returns {Object}
 */
function getPadding(padding) {
  if (!padding) return getPadding("0 0 0 0")

  const paddings = padding.split(" ")
  if (paddings.length !== 4) return getPadding()

  return StyleSheet.create({
    paddings: {
      paddingTop: Number(paddings[0]),
      paddingRight: Number(paddings[1]),
      paddingBottom: Number(paddings[2]),
      paddingLeft: Number(paddings[3]),
    },
  }).paddings
}

const responsiveHeight = (heightRes) => {
  if (!isTablet()) {
    return heightRes
  }
  return heightRes + heightRes * 0.25
}

/**
 * Calculates screen percentage in pixels from device width
 *
 * @param {number} widthPercent
 * @returns {number}
 */
function widthPercentageToDP(widthPercent) {
  const screenWidth = width
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent)
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100)
}

/**
 * Calculates screen percentage in pixels from device height
 *
 * @param {number} heightPercent
 * @returns {number}
 */
function heightPercentageToDP(heightPercent) {
  const screenHeight = height
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent)
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100)
}

/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
  const dim = Dimensions.get("screen")
  return dim.height >= dim.width
}

/**
 * Returns true of the screen is in landscape mode
 */
const isLandscape = () => {
  const dim = Dimensions.get("screen")
  return dim.width >= dim.height
}

export {
  getMargins,
  getPadding,
  getScaledFont,
  heightPercentageToDP,
  isLandscape,
  isPortrait,
  isTablet,
  relativeHeight,
  relativeWidth,
  responsiveFontSize,
  responsiveHeight,
  widthPercentageToDP,
}
