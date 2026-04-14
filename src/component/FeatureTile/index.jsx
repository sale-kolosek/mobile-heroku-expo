import PropTypes from "prop-types"
import React, { memo } from "react"
import { StyleSheet, View } from "react-native"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"

import { globalStyles, Text } from "../../Theme"
import Hairline from "../Hairline"

const styles = StyleSheet.create({
  row: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  tileDetails: {
    marginHorizontal: 10,
    justifyContent: "space-evenly",
    alignSelf: "stretch",
  },
})

const FeatureTile = ({ item }) => {
  return (
    <>
      <View style={styles.row}>
        <Icon name="hexagon" style={globalStyles.icon} />
        <View style={styles.tileDetails}>
          <Text style={{ fontSize: 12 }}>{item.name}</Text>
          <Text style={{ fontSize: 12 }}>{item.description}</Text>
        </View>
      </View>
      <Hairline />
    </>
  )
}

FeatureTile.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
}

export default memo(FeatureTile)
