/* eslint-disable import/named */
/* eslint-disable react/require-default-props */
import PropTypes from "prop-types"
import React, { memo } from "react"
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { FontAwesome as Icon } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"

import { toggleHidden } from "../../store/AppData"
import { Colors, globalStyles, Text } from "../../Theme"
import navigatorUtil from "../../util/navigator-util"

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

const Header = ({
  route = null,
  title = null,
  left = null,
  right = null,
  showFilterModal = null,
}) => {
  const insets = useSafeAreaInsets()
  const getCurrentRoute = () => route?.name

  const Title = () => (
    <View style={[styles.item, { flex: 4 }]}>
      <Text style={{ color: "#fff", fontSize: 16 }}>{title || "Heroku Manager"}</Text>
    </View>
  )

  const Back = () => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigatorUtil.pop()
      }}
    >
      <Icon name="chevron-left" style={globalStyles.headerIcon} />
    </TouchableOpacity>
  )

  const Filter = () => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        showFilterModal()
      }}
    >
      <Icon name="filter" style={globalStyles.headerIcon} />
    </TouchableOpacity>
  )

  const Settings = () => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        if (getCurrentRoute() !== "Settings")
          navigatorUtil.navigate("Root", { screen: "Settings", initial: true })
        else navigatorUtil.pop()
      }}
    >
      <Icon name="cog" style={globalStyles.headerIcon} />
    </TouchableOpacity>
  )

  const AppSettings = () => (
    <TouchableOpacity style={styles.item} onPress={() => navigatorUtil.navigate("AppSettings")}>
      <Icon name="wrench" style={globalStyles.headerIcon} />
    </TouchableOpacity>
  )

  const Eye = () => {
    const hidden = useSelector(({ appData }) => appData.configVarsHidden)
    const dispatch = useDispatch()
    return (
      <TouchableOpacity style={styles.item} onPress={() => dispatch(toggleHidden())}>
        <Icon name={hidden ? "eye" : "eye-slash"} style={globalStyles.headerIcon} />
      </TouchableOpacity>
    )
  }

  const leftComponents = {
    back: Back,
    filter: Filter,
  }

  const rightComponents = {
    settings: Settings,
    appSettings: AppSettings,
    eye: Eye,
  }

  return (
    <View
      style={{
        flexDirection: "row",
        paddingTop: insets.top + 20,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: 8,
        backgroundColor: Colors.primary,
        justifyContent: "space-around",
      }}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {(left && leftComponents[left]()) || <View style={styles.item} />}
      {Title()}
      {(right && rightComponents[right]()) || <View style={styles.item} />}
    </View>
  )
}

Header.propTypes = {
  route: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  showFilterModal: PropTypes.func,
}

export default memo(Header)
