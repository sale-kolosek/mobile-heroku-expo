/* eslint-disable import/named */
import React, { useState } from "react"
import { FlatList, TouchableHighlight, View } from "react-native"
import { Octicons as Icon } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"

import Hairline from "../../../component/Hairline"
import Screen from "../../../layouts/Screen"
import { fetchConfigVars } from "../../../store/AppData"
import { Colors, globalStyles, Text } from "../../../Theme"
import navigatorUtil from "../../../util/navigator-util"
import { PurchasePremiumPlan } from "../../../util/inapp-util"
import PremiumLoader from "../../../component/PremiumLoader"
import storageUtil from "../../../util/storage-util"
import ENUMS from "../../../constants/ENUMS"
import { unlockPremium } from "../../../store/Auth"

const AppSettings = () => {
  const dispatch = useDispatch()
  const [appID, premium, userProfile] = useSelector(({ appData, auth, profile }) => [
    appData.data.id,
    auth.premium,
    profile.profile,
  ])
  const [loadingPayment, setLoadingPayment] = useState(false)

  const handleRouteSelection = (route) => {
    switch (route) {
      case "PremiumFeature":
        dispatch(fetchConfigVars(appID))
        break
      default:
        break
    }
    navigatorUtil.navigate(route)
  }

  const settings = [
    {
      icon: "tools",
      route: "PremiumFeature",
      label: "Config Vars",
      premium: true,
    },
    {
      icon: "organization",
      route: "Collaborators",
      label: "Access",
      premium: false,
    },
    { icon: "checklist", route: "Features", label: "Features", premium: true },
    { icon: "file", route: "Dynos", label: "Dynos", premium: true },
    { icon: "repo-forked", route: "Webhooks", label: "Webhooks", premium: true },
  ]

  return (
    <Screen withoutScrollView headerProps={{ left: "back", title: "App Settings" }}>
      <FlatList
        contentContainerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.darkGreyBorder,
        }}
        data={settings}
        keyExtractor={(item) => item.route}
        renderItem={({ item }) => {
          const isFreePlan = !premium
          return (
            <TouchableHighlight
              onPress={async () => {
                if (isFreePlan && item.premium) {
                  setLoadingPayment(true)
                  await PurchasePremiumPlan({
                    userID: userProfile.id,
                    onSuccess: () => {
                      setLoadingPayment(false)
                      handleRouteSelection(item.route)
                      dispatch(unlockPremium())
                    },
                  })
                  setLoadingPayment(false)
                  return
                } else handleRouteSelection(item.route)
              }}
              underlayColor="#eee"
              style={globalStyles.row}
            >
              <>
                <Icon name={item.icon} style={globalStyles.iconGrey} />
                <View style={{ flex: 6, flexDirection: "row", alignItems: "center" }}>
                  <Text>{item.label}</Text>
                  {isFreePlan && item.premium && (
                    <View
                      style={{
                        backgroundColor: Colors.premium,
                        borderRadius: 8,
                        marginLeft: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 8,
                      }}
                    >
                      <Text style={{ fontSize: 13, color: "white" }}>Premium</Text>
                    </View>
                  )}
                </View>
                {item.route !== "SignOut" ? (
                  <Icon name="chevron-right" style={globalStyles.iconGrey} />
                ) : (
                  <View style={{ flex: 1 }} />
                )}
              </>
            </TouchableHighlight>
          )
        }}
        ItemSeparatorComponent={() => <Hairline color={Colors.darkGreyBorder} />}
      />
    </Screen>
  )
}

export default AppSettings
