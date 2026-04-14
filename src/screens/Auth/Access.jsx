import React, { useEffect, useRef } from "react"
import { Animated, StatusBar, TouchableOpacity, View } from "react-native"

import Logo from "../../component/Logo"
import { globalStyles, Text } from "../../Theme"
import navigatorUtil from "../../util/navigator-util"

const Access = () => {
  const opacity = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(opacity.current, { duration: 250, toValue: 1, useNativeDriver: true }).start()
  }, [])

  return (
    <View
      style={{
        ...globalStyles.container,
        justifyContent: "flex-end",
        backgroundColor: "white",
      }}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Logo />
      </View>
      <Animated.View
        style={{
          backgroundColor: "white",
          overflow: "hidden",
          opacity: opacity.current,
          width: "100%",
          alignItems: "stretch",
          justifyContent: "flex-end",
        }}
      >
        <Text style={{ textAlign: "center" }}>Rollback and Restart Dynos</Text>
        <TouchableOpacity
          style={{ ...globalStyles.button, marginHorizontal: 20 }}
          onPress={() => navigatorUtil.navigate("ApiKey")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>SIGN IN</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default Access
