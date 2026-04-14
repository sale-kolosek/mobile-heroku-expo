/* eslint-disable react/require-default-props */
import PropTypes from "prop-types"
import React, { memo } from "react"
import { View } from "react-native"
import { Input } from "react-native-elements"
import { useSelector } from "react-redux"

import styles from "./ConfigVarTile.styles"

const ConfigVarTile = ({ item = {}, editKey = null, editVar = null }) => {
  const hidden = useSelector(({ appData }) => appData.configVarsHidden)
  const newVar = item.originalKey.slice(0, 6) === "NEWVAR"

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: newVar ? 10 : 20,
      }}
    >
      {newVar && (
        <Input
          value={item.key}
          placeholder="Key"
          labelStyle={{ fontSize: 10, fontWeight: "normal" }}
          inputStyle={{ padding: 0, fontSize: 12 }}
          onChangeText={(text) => editKey(item, text)}
        />
      )}
      <Input
        value={item.value}
        placeholder="Value"
        label={newVar ? "" : item.key}
        labelStyle={{ fontSize: 10, fontWeight: "normal" }}
        inputStyle={{ padding: 0, fontSize: 12 }}
        onChangeText={(text) => editVar(item, text)}
        secureTextEntry={hidden}
      />
    </View>
  )
}

ConfigVarTile.propTypes = {
  item: PropTypes.instanceOf(Object),
  editKey: PropTypes.func,
  editVar: PropTypes.func,
}

export default memo(ConfigVarTile)
