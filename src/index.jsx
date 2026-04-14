import React from "react"
import { View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import Footer from "./component/Footer"
import useCachedResources from "./hooks/useCachedResources"
import AppNavigator from "./navigation/AppNavigator"
import { globalStyles } from "./Theme"

const HerokuManager = () => {
  useCachedResources()

  return (
    <SafeAreaProvider>
      <View style={[globalStyles.screen]}>
        <AppNavigator />
        <Footer />
      </View>
    </SafeAreaProvider>
  )
}

export default HerokuManager
