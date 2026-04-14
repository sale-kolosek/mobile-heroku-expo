/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import React from "react"
import { Image, Platform, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux"

import LogoWhite from "../../../assets/images/LogoWhite.png"
// import { unlockPremium } from "../../../store/Auth"
import { Colors, globalStyles, Text } from "../../../Theme"
import navigatorUtil from "../../../util/navigator-util"

const NoPremium = ({ featureName }) => {
  const dispatch = useDispatch()
  return (
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
        <Text style={globalStyles.greyText}>• Full access to your app&apos;s ENV variables</Text>
        <Text style={globalStyles.greyText}>• Edit app collaborators</Text>
        <Text style={globalStyles.greyText}>• Single payment - pay only one time!</Text>
        <Text style={globalStyles.greyText}>• FREE for the first 3 months</Text>
      </View>
      <TouchableOpacity
        style={{ ...globalStyles.button, marginHorizontal: 20, alignSelf: "stretch" }}
        onPress={() => {
          if (["config-vars", "access"].includes(featureName) && Platform.OS === "ios") {
            let product

            switch (featureName) {
              case "config-vars":
                product = "herokumngvars001"
                break
              case "access":
                product = "useraccess001"
                break
              default:
            }
          } else {
            // dispatch(unlockPremium())
          }
        }}
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
  )
}

export default NoPremium
