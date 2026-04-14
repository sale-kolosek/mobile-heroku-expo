/* eslint-disable react/require-default-props */
import PropTypes from "prop-types"
import React, { memo } from "react"
import { ActivityIndicator } from "react-native"

import styles from "./Spinner.styles"

const Spinner = ({ size = "small", color = "white" }) => {
  return <ActivityIndicator size={size} style={styles.container} color={color} />
}

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
}

export default memo(Spinner)
