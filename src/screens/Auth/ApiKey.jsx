/* eslint-disable no-shadow */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/named */
import * as Clipboard from "expo-clipboard"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Linking, TouchableOpacity, View } from "react-native"
import { Input } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"

import usePrevious from "../../hooks/usePrevious"
import Screen from "../../layouts/Screen"
import { getAccount } from "../../store/Auth"
import { Colors, globalStyles, Text } from "../../Theme"
import Toast from "../../util/Toast"

const ApiKey = (props) => {
  const dispatch = useDispatch()
  const [apiKey, setApiKey] = useState("")
  const [token, error] = useSelector(({ auth }) => [auth.token, auth.error])
  const prevToken = usePrevious(token)
  const prevError = usePrevious(error)

  useEffect(() => {
    if (token?.length) {
      setApiKey(token)
    }
  }, [token])

  useEffect(() => {
    if (token && prevToken !== token) {
      Toast.success("Api key saved!")
      props.navigation.replace("Root")
    }
    if (!prevError && error?.length > 0 && apiKey) Toast.error(error)
  }, [apiKey, error, prevError, prevToken, props.navigation, token])

  const handleInputChange = (val) => setApiKey(val)

  const pasteFromClipboard = async () => {
    const clipboardData = await Clipboard.getString()
    setApiKey(clipboardData)
  }

  return (
    <Screen
      navigation={props.navigation}
      headerProps={{ title: "Authentication", left: "back" }}
      style={{ padding: 20 }}
    >
      <View style={{ paddingTop: 35 }}>
        <Input
          labelStyle={{ fontSize: 14, fontWeight: "normal" }}
          inputStyle={{ padding: 0 }}
          value={apiKey}
          label="API key"
          onChangeText={(text) => handleInputChange(text)}
        />
      </View>

      <View style={{ flexGrow: 1, alignItems: "center", paddingBottom: 20 }}>
        <Text margin="0 0 5 0">Here you can find your API key</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://dashboard.heroku.com/account#api-key")}
        >
          <Text style={{ fontSize: 10, color: Colors.primary }}>
            https://dashboard.heroku.com/account#api-key
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={globalStyles.outlineButton} onPress={() => pasteFromClipboard()}>
        <Text style={{ color: Colors.primary, fontWeight: "900" }}>PASTE FROM CLIPBOARD</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...globalStyles.button, marginBottom: 5 }}
        disabled={!apiKey.trim() || apiKey === token}
        onPress={() => {
          if (apiKey !== token) dispatch(getAccount("signIn", apiKey))
        }}
      >
        <Text style={{ color: "white", fontWeight: "900" }}>SIGN IN</Text>
      </TouchableOpacity>
    </Screen>
  )
}

ApiKey.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default ApiKey
