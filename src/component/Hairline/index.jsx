/* eslint-disable react/require-default-props */
import PropTypes from "prop-types"
import React, { memo } from "react"
import { View } from "react-native"

import { Colors } from "../../Theme"

const Hairline = ({ color = Colors.lightGreyBorder }) => (
  <View style={{ width: "100%", borderBottomWidth: 1, borderBottomColor: color }} />
)

Hairline.propTypes = {
  color: PropTypes.string,
}

export default memo(Hairline)
