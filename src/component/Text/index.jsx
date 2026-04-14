/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { memo } from "react"
import { Text as RNText } from "react-native"

import Colors from "../../Theme/Colors"
import { getMargins, responsiveFontSize } from "../../util/styles-util"

const Text = (props) => {
  const { style, margin } = props
  const marginStyle = getMargins(margin)
  const fontStyle = [
    {
      color: Colors.text,
    },
    style,
    { fontSize: responsiveFontSize((style && style.fontSize) || 12) },
  ]
  if (margin) {
    fontStyle.push(marginStyle)
  }

  return <RNText {...props} style={fontStyle} />
}

export default memo(Text)
