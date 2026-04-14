/* eslint-disable import/named */
/* eslint-disable no-undef */
import React, { useState } from "react"
import { Keyboard, TouchableOpacity } from "react-native"
import { Input } from "react-native-elements"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"

import Logo from "../../../component/Logo"
import Spinner from "../../../component/Spinner"
import Screen from "../../../layouts/Screen"
import { signIn } from "../../../store/Auth"
import { globalStyles, Text } from "../../../Theme"
import navigatorUtil from "../../../util/navigator-util"
import validatorUtil from "../../../util/validator-util"
import styles from "./SignIn.styles"

const passwordInput = React.createRef()

const SignIn = () => {
  const dispatch = useDispatch()
  const [loading] = useSelector(({ auth }) => [auth.loading])
  const [email, setEmail] = useState({ value: "", error: null })
  const [password, setPassword] = useState({ value: "", error: null })
  const [hidePassword, setHidePassword] = useState(true)

  const onLoginPressed = () => {
    Keyboard.dismiss()
    const emailError = validatorUtil.emailValidator(email.value)
    const passwordError = validatorUtil.passwordValidator(password.value)

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    dispatch(
      signIn({
        username: email.value,
        password: password.value,
      }),
    )
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
      <Text style={styles.description}>Please use your Heroku credentials</Text>
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
        onSubmitEditing={() => {
          passwordInput.current.focus()
        }}
        labelStyle={{ fontSize: 10, fontWeight: "normal" }}
        inputStyle={{ padding: 0 }}
        containerStyle={{ marginBottom: 5 }}
        errorMessage={email.error}
      />
      <Input
        disabled={loading}
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: null })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={hidePassword}
        ref={passwordInput}
        labelStyle={{ fontSize: 10, fontWeight: "normal" }}
        inputStyle={{ padding: 0 }}
        rightIcon={() => (
          <Icon
            name={hidePassword ? "eye" : "eye-off"}
            style={globalStyles.icon}
            onPress={() => setHidePassword(!hidePassword)}
          />
        )}
        errorMessage={password.error}
      />
      <Text style={styles.forgotPassLabel} onPress={() => navigatorUtil.navigate("ResetPassword")}>
        Forgot Password?
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ ...globalStyles.button, marginTop: 10, marginBottom: 5 }}
        onPress={onLoginPressed}
      >
        {loading ? (
          <Spinner />
        ) : (
          <Text style={{ color: "white", fontWeight: "bold" }}>SIGN IN</Text>
        )}
      </TouchableOpacity>
    </Screen>
  )
}

export default SignIn
