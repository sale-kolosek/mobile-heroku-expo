import React, { useRef } from "react"
import { Linking, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import WebView from "react-native-webview"
import { useSelector } from "react-redux"

import { AD_AUTH_URL, AD_NOAUTH_URL } from "../../util/env"

const Footer = () => {
  const webview = useRef(null)
  const email = useSelector(({ auth }) => (auth.data ? auth.data.email : undefined))
  const insets = useSafeAreaInsets()

  if (!AD_AUTH_URL && !AD_NOAUTH_URL) return null

  return (
    <View
      style={{
        height: 50,
        width: "100%",
        overflow: "hidden",
        zIndex: -1000,
        alignSelf: "flex-end",
        paddingLeft: insets.left,
        paddingRight: insets.right,
        marginBottom: insets.bottom,
      }}
    >
      <WebView
        style={{ backgroundColor: "#fff0", overflow: "hidden", height: 50, width: "100%" }}
        ref={webview}
        source={
          email ? { uri: AD_AUTH_URL, headers: { "Data-User-Id": email } } : { uri: AD_NOAUTH_URL }
        }
        onNavigationStateChange={(event) => {
          if (event.navigationType === "click") {
            webview.current.stopLoading()
            Linking.openURL(event.url)
          }
        }}
      />
    </View>
  )
}

export default Footer
