import PropTypes from "prop-types"
import React, { memo } from "react"
import { View } from "react-native"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"

import { globalStyles, Text } from "../../Theme"

const ReleaseTile = ({ item }) => {
  const iconType =
    item.description.split(" ")[0] === "Rollback" ? "restart" : "arrow-up-bold-hexagon-outline"
  return (
    <View style={globalStyles.row}>
      <Icon name={iconType} style={globalStyles.icon} />
      <View style={globalStyles.tileDetails}>
        <Text style={{ fontSize: 14 }}>{item.description}</Text>
        <Text style={globalStyles.date}>
          v{item.version}, {new Date(item.created_at).toString().slice(0, 15)}
        </Text>
      </View>
    </View>
  )
}

ReleaseTile.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
}

export default memo(ReleaseTile)
