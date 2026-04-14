/* eslint-disable import/named */
/* eslint-disable no-undef */
import React, { useState } from "react"
import { Keyboard, TouchableOpacity } from "react-native"
import { Input } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"

import Logo from "../../../component/Logo"
import Spinner from "../../../component/Spinner"
import Screen from "../../../layouts/Screen"
import { resetPassword } from "../../../store/Auth"
import { globalStyles, Text } from "../../../Theme"
import navigatorUtil from "../../../util/navigator-util"
import validatorUtil from "../../../util/validator-util"
import styles from "./ResetPassword.styles"

const ResetPassword = () => {
  const dispatch = useDispatch()
  const [loading] = useSelector(({ auth }) => [auth.loading])
  const [email, setEmail] = useState({ value: "", error: null })

  const onLoginPressed = () => {
    Keyboard.dismiss()
    const emailError = validatorUtil.emailValidator(email.value)

    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    dispatch(resetPassword(email.value))
  }

  return (
    <Screen
      withoutHeader
      scrollViewProps={{
        enableAutomaticScroll: true,
        extraHeight: 250,
        enableOnAndroid: true,
        keyboardShouldPersistTaps: "never",
      }}
      style={styles.container}
    >
      <Logo type="small" />
      <Text style={styles.description}>
        Enter your email address and you will receive an email to reset your password.
      </Text>
      <Input
        disabled={loading}
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: null })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        labelStyle={{ fontSize: 10, fontWeight: "normal" }}
        inputStyle={{ padding: 0 }}
        containerStyle={{ marginBottom: 5 }}
        errorMessage={email.error}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ ...globalStyles.button, marginTop: 10, marginBottom: 5 }}
        onPress={onLoginPressed}
      >
        {loading ? (
          <Spinner />
        ) : (
          <Text
            onPress={() => navigatorUtil.navigate("ResetPassword")}
            style={{ color: "white", fontWeight: "bold" }}
          >
            RESET PASSWORD
          </Text>
        )}
      </TouchableOpacity>
      <Text style={styles.description} onPress={() => navigatorUtil.pop()}>
        Back to Sign In
      </Text>
    </Screen>
  )
}

export default ResetPassword
