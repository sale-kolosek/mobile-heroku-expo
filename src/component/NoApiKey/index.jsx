import React, { memo } from "react"
import { Image, Text, View } from "react-native"

import NoApiKeyImage from "../../assets/images/NoApiKey.png"
import { globalStyles } from "../../Theme"

const NoApiKey = () => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <View style={globalStyles.imageComponent}>
      <Image
        source={NoApiKeyImage}
        style={{ marginVertical: 30, width: "100%", flex: 2, resizeMode: "contain" }}
        fadeDuration={0}
      />
      <View style={globalStyles.centeredColumn}>
        <Text style={globalStyles.greyTextBig}>No API key found.</Text>
        <Text style={globalStyles.greyText}>Please go to settings.</Text>
      </View>
    </View>
  </View>
)

export default memo(NoApiKey)
