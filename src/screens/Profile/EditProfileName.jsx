/* eslint-disable import/named */
import React, { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Input } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"

import Screen from "../../layouts/Screen"
import { saveProfile } from "../../store/Profile"
import { globalStyles } from "../../Theme"
import navigatorUtil from "../../util/navigator-util"

const EditProfileName = () => {
  const profileName = useSelector(({ profile }) => profile.profile.name)
  const dispatch = useDispatch()
  const [name, setName] = useState(profileName)
  const handleChangeName = () => {
    dispatch(saveProfile({ name }))
    navigatorUtil.pop()
  }
  return (
    <Screen
      style={{
        ...globalStyles.container,
        padding: 15,
      }}
      headerProps={{ left: "back", title: "Edit Name" }}
    >
      <Input
        labelStyle={{ fontSize: 10, fontWeight: "normal" }}
        inputStyle={{ padding: 0 }}
        value={name}
        label="Name"
        autoFocus
        onChangeText={(text) => setName(text)}
      />
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => handleChangeName()}
        disabled={name === ""}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>SUBMIT</Text>
      </TouchableOpacity>
    </Screen>
  )
}
export default EditProfileName
