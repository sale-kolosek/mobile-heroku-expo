import React from "react"

import NoApiKey from "../../component/NoApiKey"
import Screen from "../../layouts/Screen"

const Welcome = () => {
  return (
    <Screen headerProps={{ title: "Heroku Manager", right: "settings" }}>
      <NoApiKey />
    </Screen>
  )
}

export default Welcome
