/* eslint-disable react/prop-types */
import React from "react"
import { ActivityIndicator } from "react-native"
import WebView from "react-native-webview"

import Screen from "../../layouts/Screen"

const uri = "https://ad.kolosek.com/forms/heroku/contact.html"

const Contact = () => {
  return (
    <Screen
      headerProps={{ left: "back", title: "Contact us" }}
      style={{ paddingLeft: 35, paddingTop: 20 }}
    >
      <WebView
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator
            color="grey"
            size="large"
            style={{ position: "absolute", left: -30, right: 0, top: 0, bottom: 0 }}
          />
        )}
        source={{ uri }}
        style={{ backgroundColor: "#fff0" }}
      />
    </Screen>
  )
}

export default Contact
