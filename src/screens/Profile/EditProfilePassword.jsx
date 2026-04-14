/* eslint-disable import/named */
import React, { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { Input } from "react-native-elements/dist/input/Input"
import { useDispatch } from "react-redux"

import Screen from "../../layouts/Screen"
import { saveProfile } from "../../store/Profile"
import { Colors, globalStyles, Text } from "../../Theme"
import Toast from "../../util/Toast"

const EditProfilePassword = () => {
  const dispatch = useDispatch()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  const handleChangePassword = () => {
    if (currentPassword === "") {
      Toast.error("Current Password can't be empty!")
    } else if (newPassword === "") {
      Toast.error("New Password can't be empty!")
    } else if (confirmNewPassword === "") {
      Toast.error(`Confirm New Password\ncan't be empty!`)
    } else if (newPassword.length < 8) {
      Toast.error("Password must contain 8 or more characters!")
    } else if (newPassword !== confirmNewPassword) {
      Toast.error("New password and password confirm must match!")
    } else if (
      /\d/.test(newPassword) +
        /[a-z]/.test(newPassword) +
        /[A-Z]/.test(newPassword) +
        /\W/.test(newPassword) <
      3
    ) {
      Toast.error(
        "Password is invalid. Must contain three of the four: Capital, lower, number, symbol.",
      )
    } else {
      dispatch(saveProfile({ password: currentPassword, new_password: newPassword }))
    }
  }

  return (
    <Screen
      style={{
        ...globalStyles.container,
        padding: 15,
      }}
      headerProps={{ left: "back", title: "Change Password" }}
    >
      <Input
        labelStyle={{ fontSize: 10, fontWeight: "normal" }}
        inputStyle={{ padding: 0 }}
        value={currentPassword}
        label="Current Password"
        autoFocus
        secureTextEntry
        onChangeText={(text) => setCurrentPassword(text)}
        testID="CurrentPassword.Input"
      />
      <Input
        labelStyle={{ fontSize: 10, fontWeight: "normal" }}
        inputStyle={{ padding: 0 }}
        value={newPassword}
        label="New Password"
        secureTextEntry
        onChangeText={(text) => setNewPassword(text)}
        testID="NewPassword.Input"
      />
      <Input
        labelStyle={{ fontSize: 10, fontWeight: "normal" }}
        inputStyle={{ padding: 0 }}
        value={confirmNewPassword}
        label="Confirm New Password"
        secureTextEntry
        onChangeText={(text) => setConfirmNewPassword(text)}
        testID="ConfirmPassword.Input"
      />
      <Text style={{ color: Colors.primary, fontStyle: "italic", marginHorizontal: 10 }}>
        Password must contain three of the four characters: capital, lower, number, symbol.
      </Text>
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={globalStyles.button} onPress={() => handleChangePassword()}>
        <Text style={{ color: "white", fontWeight: "bold" }}>SUBMIT</Text>
      </TouchableOpacity>
    </Screen>
  )
}
export default EditProfilePassword
