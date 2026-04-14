/* eslint-disable react/require-default-props */
import PropTypes from "prop-types"
import React, { memo } from "react"
import { Image } from "react-native"

import LogoWhite from "../../assets/images/LogoWhite.png"

const Logo = ({ type = "large" }) => {
  let width
  let height
  switch (type) {
    case "small":
      width = 123
      height = 123
      break
    case "large":
      width = 256
      height = 256
      break
    default:
      break
  }
  return (
    <Image
      source={LogoWhite}
      style={{
        maxWidth: width,
        maxHeight: height,
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        alignSelf: "center",
      }}
      fadeDuration={0}
    />
  )
}

Logo.propTypes = {
  type: PropTypes.string,
}

export default memo(Logo)
