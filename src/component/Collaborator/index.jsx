/* eslint-disable react/prop-types */
import React, { memo } from "react"
import { View } from "react-native"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"

import { globalStyles, Text } from "../../Theme"
import Hairline from "../Hairline"

const Collabolator = ({ item }) => {
  return (
    <>
      <View style={globalStyles.row}>
        <Icon name="account" style={globalStyles.icon} />
        <View style={globalStyles.tileDetails}>
          <Text style={{ fontSize: 14 }}>{item.email}</Text>
        </View>
      </View>
      <Hairline />
    </>
  )
}

export default memo(Collabolator)
