/* eslint-disable import/named */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react"
import { FlatList, TouchableHighlight, View } from "react-native"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"

import Hairline from "../../component/Hairline"
import useOTAVersion from "../../hooks/useOTAVersion"
import Screen from "../../layouts/Screen"
import { signOut, unlockPremium } from "../../store/Auth"
import { fetchInvoiceAddress } from "../../store/Invoices"
import { Colors, globalStyles, Text } from "../../Theme"
import navigatorUtil from "../../util/navigator-util"
import { PurchasePremiumPlan } from "../../util/inapp-util"
import PremiumLoader from "../../component/PremiumLoader"

const Settings = () => {
  const dispatch = useDispatch()
  const [token, authorizationId, premium, userProfile] = useSelector(({ auth, profile }) => [
    auth.token,
    auth.authorizationId,
    auth.premium,
    profile.profile,
  ])
  const { appVersion } = useOTAVersion()
  const [loadingPayment, setLoadingPayment] = useState(false)

  const handleSignOut = () => {
    dispatch(signOut(token, authorizationId))
    navigatorUtil.replace("Auth", { screen: "Access", initial: true })
  }

  const handleRouteSelection = (route) => {
    switch (route) {
      case "Invoices":
        dispatch(fetchInvoiceAddress())
        break
      default:
        break
    }
    navigatorUtil.navigate("Root", { screen: route, initial: true })
  }

  const settings = [
    { icon: "account", route: "Profile", label: "Profile", premium: true },
    { icon: "file", route: "Invoices", label: "Invoices", premium: true },
    {
      icon: "account-circle",
      route: "EnterpriseAccountScreen",
      label: "Enterprise Accounts",
      premium: true,
    },
    {
      icon: "lock-open",
      route: "Permissions",
      label: "Permissions",
      premium: true,
    },
    {
      icon: "account-plus",
      route: "TeamsScreen",
      label: "Teams List",
      premium: true,
    },
    { icon: "information", route: "About", label: "About", premium: false },
    { icon: "email", route: "Contact", label: "Contact Us", premium: false },
    { icon: "logout", route: "SignOut", label: "Sign Out", premium: false },
  ]

  return (
    <Screen withoutScrollView headerProps={{ left: "back", title: "Settings" }}>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={
          token
            ? settings
            : settings.filter(
                (a) =>
                  ![
                    "SignOut",
                    "Profile",
                    "Invoices",
                    "EnterpriseAccountScreen",
                    "Permissions",
                    "TeamsScreen",
                  ].includes(a.route),
              )
        }
        keyExtractor={(item) => item.route}
        renderItem={({ item }) => {
          const isFreePlan = !premium
          return (
            <>
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
                  } else if (item.route === "SignOut") {
                    handleSignOut()
                    return
                  } else handleRouteSelection(item.route)
                }}
                underlayColor="#eee"
                style={globalStyles.row}
              >
                <>
                  <Icon name={item.icon} style={globalStyles.iconGrey} />
                  <View
                    style={{
                      flex: 6,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
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
              <Hairline color={Colors.darkGreyBorder} />
            </>
          )
        }}
        ListFooterComponent={() => (
          <Text
            style={{
              textAlign: "center",
              color: Colors.primary,
              marginVertical: 20,
            }}
          >
            App Version {appVersion}
          </Text>
        )}
      />
      <PremiumLoader loading={loadingPayment} />
    </Screen>
  )
}

export default Settings
