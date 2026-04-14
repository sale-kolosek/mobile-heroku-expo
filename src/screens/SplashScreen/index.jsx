/* eslint-disable react/prop-types */
import React from "react"
import { ActivityIndicator, Image, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Logo from "../../assets/images/LogoWhite.png"
import { Colors, globalStyles } from "../../Theme"

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 70,
    backgroundColor: "white",
  },
  text: {
    flex: 1,
    fontSize: 24,
    color: Colors.primary,
  },
})

const SplashScreen = ({ footer }) => {
  const insets = useSafeAreaInsets()
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
        <Image
          source={Logo}
          style={{
            marginTop: insets.top,
            width: 256,
            height: 256,
            overflow: "hidden",
            backgroundColor: "white",
          }}
          fadeDuration={0}
        />
        <ActivityIndicator color="grey" />
      </View>
      <View
        style={{
          height: footer ? 210 : 160,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      />
    </View>
  )
}

export default SplashScreen
