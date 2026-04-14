/* eslint-disable no-shadow */
/* eslint-disable import/named */
import React, { useEffect, useState } from "react"
import { FlatList, Modal, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { Input } from "react-native-elements"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useDispatch, useSelector } from "react-redux"

import Spinner from "../../../component/Spinner"
import Screen from "../../../layouts/Screen"
import { fetchInvoiceAddress, saveInvoiceAddress } from "../../../store/Invoices"
import { Colors, globalStyles } from "../../../Theme"
import styles from "./InvoicesAddressScreen.styles"

const InvoicesAddressScreen = () => {
  const dispatch = useDispatch()
  const [loading, address] = useSelector(({ address }) => [
    address.address.loading,
    address.address.data,
  ])

  const [isModalVisible, setisModalVisible] = useState(false)

  const [address1, setAddress1] = useState(address.address_1 || "")
  const [address2, setAddress2] = useState(address.address_2 || "")
  const [city, setCity] = useState(address.city || "")
  const [country, setCountry] = useState(address.country || "")
  const [state, setState] = useState(address.state || "")
  const [postalCode, setPostalCode] = useState(address.postal_code || "")
  const [errorMessage, setErrorMessage] = useState("")

  const addressData = {
    address_1: address1,
    address_2: address2,
    city,
    country,
    state,
    postal_code: postalCode,
  }

  const handleSave = () => {
    if (addressData.address_1 === "") {
      setErrorMessage("Address 1 field can't be empty!")
    } else if (addressData.city === "") {
      setErrorMessage("City field can't be empty!")
    } else if (addressData.country === "") {
      setErrorMessage("Country field can't be empty!")
    } else if (addressData.postal_code === "") {
      setErrorMessage("Postal Code field can't be empty!")
    } else {
      setErrorMessage("")
      dispatch(saveInvoiceAddress({ address: addressData }))
      setisModalVisible(false)
    }
  }

  const handleCancel = () => {
    setisModalVisible(false)
    setErrorMessage("")
  }

  useEffect(() => {
    dispatch(fetchInvoiceAddress())
  }, [dispatch])

  const info = [
    { info: `${address.address_1 || "No Address Provided"}`, title: "Address 1: ", id: 1 },
    { info: ` ${address.address_2 || "No Address Provided"}`, title: "Address 2: ", id: 2 },
    { info: `${address.city || "Not Provided"}`, title: "City: ", id: 3 },
    { info: `${address.country || "Not Provided"}`, title: "Country: ", id: 4 },
    { info: `${address.state || "Not Provided"}`, title: "State: ", id: 5 },
    { info: `${address.postal_code || "Not Provided"}`, title: "Postal Code: ", id: 6 },
  ]

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: `Invoice Address` }}
    >
      {loading ? (
        <Spinner size="large" style={{ flexGrow: 1, alignSelf: "center" }} color={Colors.primary} />
      ) : (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              ...globalStyles.button,
              marginHorizontal: 20,
              alignSelf: "stretch",
            }}
            onPress={() => setisModalVisible(true)}
          >
            <Text style={{ color: "white", fontWeight: "900" }}>EDIT</Text>
          </TouchableOpacity>
          <FlatList
            style={{ marginTop: 20 }}
            data={info}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableHighlight underlayColor="#eee">
                <View>
                  <Text style={globalStyles.itemTitle}>{item.title}</Text>
                  <Text style={globalStyles.itemInfo}>{item.info}</Text>
                </View>
              </TouchableHighlight>
            )}
          />
          <View style={{ flexGrow: 1, flex: 1, zIndex: 10 }}>
            <Modal animationType="fade" transparent={false} visible={isModalVisible}>
              <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollViewContainer}
                showsVerticalScrollIndicator={false}
              >
                <View style={{ flex: 1 }} />
                <Input
                  labelStyle={{ fontSize: 12, fontWeight: "normal" }}
                  inputStyle={{ padding: 0 }}
                  value={address1}
                  label="Address 1"
                  autoFocus
                  onChangeText={(text) => setAddress1(text)}
                />
                <Input
                  labelStyle={{ fontSize: 12, fontWeight: "normal" }}
                  inputStyle={{ padding: 0 }}
                  value={address2 ?? address.address_2}
                  label="Address 2"
                  autoFocus
                  onChangeText={(text) => setAddress2(text)}
                />
                <Input
                  labelStyle={{ fontSize: 12, fontWeight: "normal" }}
                  inputStyle={{ padding: 0 }}
                  value={city ?? address.city}
                  label="City"
                  autoFocus
                  onChangeText={(text) => setCity(text)}
                />
                <Input
                  labelStyle={{ fontSize: 12, fontWeight: "normal" }}
                  inputStyle={{ padding: 0 }}
                  value={country ?? address.country}
                  label="Country"
                  autoFocus
                  onChangeText={(text) => setCountry(text)}
                />
                <Input
                  labelStyle={{ fontSize: 12, fontWeight: "normal" }}
                  inputStyle={{ padding: 0 }}
                  value={state ?? address.state}
                  label="State"
                  autoFocus
                  onChangeText={(text) => setState(text)}
                />
                <Input
                  labelStyle={{ fontSize: 12, fontWeight: "normal" }}
                  inputStyle={{ padding: 0 }}
                  value={postalCode}
                  label="Postal Code"
                  autoFocus
                  onChangeText={(text) => setPostalCode(text)}
                />
              </KeyboardAwareScrollView>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
              <View style={styles.optionsWrapper}>
                <TouchableOpacity style={globalStyles.button} onPress={() => handleSave()}>
                  <Text style={styles.dialogButton}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.button} onPress={handleCancel}>
                  <Text style={styles.dialogButton}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </Screen>
  )
}

export default InvoicesAddressScreen
