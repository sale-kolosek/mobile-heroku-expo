import PropTypes from "prop-types"
import React, { memo } from "react"
import { View } from "react-native"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"

import { globalStyles, Text } from "../../Theme"

const AppTile = ({ item }) => {
  return (
    <View style={globalStyles.row}>
      <Icon name="hexagon" style={globalStyles.icon} />
      <View style={globalStyles.tileDetails}>
        <View style={globalStyles.tileDetails}>
          <Text style={{ fontSize: 14 }}>{item.name}</Text>
          <Text style={globalStyles.date}>{new Date(item.created_at).toString().slice(0, 15)}</Text>
        </View>
      </View>
    </View>
  )
}

AppTile.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
}

export default memo(AppTile)
