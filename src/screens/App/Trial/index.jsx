/* eslint-disable import/named */
import PropTypes from "prop-types"
import React from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux"

import LogoWhite from "../../../assets/images/LogoWhite.png"
import Screen from "../../../layouts/Screen"
// import { unlockPremium } from "../../../store/Auth"
import { Colors, globalStyles, Text } from "../../../Theme"
import navigatorUtil from "../../../util/navigator-util"

const Trial = ({
  route: {
    params: { app = {}, featureName = "" },
  },
}) => {
  const dispatch = useDispatch()

  const handleUnlockClick = () => {
    // dispatch(unlockPremium())
    navigatorUtil.navigate("App", { app })
  }

  return (
    <Screen headerProps={{ left: "back", title: "Rollback Trial" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flex: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={LogoWhite}
            style={{ width: 128, height: 128, backgroundColor: "white" }}
            fadeDuration={0}
          />
          <Text style={globalStyles.greyTextBig}>Upgrade to Premium</Text>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ flexShrink: 1 }}>
          <Text style={globalStyles.greyText}>• Enable Rollback</Text>
          <Text style={globalStyles.greyText}>• Single payment - pay only one time!</Text>
        </View>
        <TouchableOpacity
          style={{ ...globalStyles.button, marginHorizontal: 20, alignSelf: "stretch" }}
          onPress={handleUnlockClick}
        >
          <Text style={{ color: "white", fontWeight: "900" }}>UNLOCK FEATURE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...globalStyles.outlineButton,
            alignSelf: "stretch",
            marginHorizontal: 20,
            marginBottom: 20,
          }}
          onPress={() => navigatorUtil.pop()}
        >
          <Text style={{ color: Colors.primary, fontWeight: "bold" }}>GO BACK</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

Trial.propTypes = {
  route: PropTypes.instanceOf(Object).isRequired,
}

export default Trial
