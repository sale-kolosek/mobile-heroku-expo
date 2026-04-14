import React, { memo } from "react"
import { Image, Text, View } from "react-native"

import NoAppsImage from "../../assets/images/NoApps.png"
import { globalStyles } from "../../Theme"

const NoApps = () => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <View style={globalStyles.imageComponent}>
      <Image
        source={NoAppsImage}
        style={{ marginVertical: 30, width: "100%", flex: 2, resizeMode: "contain" }}
        fadeDuration={0}
      />
      <View style={globalStyles.centeredColumn}>
        <Text style={globalStyles.greyTextBig}>No applications found</Text>
        <Text style={globalStyles.greyText}>In your Heroku account.</Text>
      </View>
    </View>
  </View>
)

export default memo(NoApps)
