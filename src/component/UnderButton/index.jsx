/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React, { memo } from "react"
import { TouchableHighlight } from "react-native"

import { globalStyles, Text } from "../../Theme"

let i = 0

const UnderButton = ({ onPress, children, disabled }) => (
  <TouchableHighlight
    disabled={disabled}
    underlayColor="#a786e9"
    onPress={onPress}
    style={globalStyles.underButton}
  >
    <>
      {children.map((child) => (
        <Text key={`${i++}`} style={{ color: "white", marginRight: 5 }}>
          {child}
        </Text>
      ))}
    </>
  </TouchableHighlight>
)

export default memo(UnderButton)
