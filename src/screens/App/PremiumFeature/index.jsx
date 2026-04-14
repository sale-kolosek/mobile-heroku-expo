/* eslint-disable react/require-default-props */
/* eslint-disable import/named */
import React from "react"

import Screen from "../../../layouts/Screen"
import { globalStyles } from "../../../Theme"
import ConfigVars from "./ConfigVars"

const PremiumFeature = () => {
  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{
        left: "back",
        right: "eye",
        title: "Config Vars",
      }}
    >
      <ConfigVars />
    </Screen>
  )
}

export default PremiumFeature
