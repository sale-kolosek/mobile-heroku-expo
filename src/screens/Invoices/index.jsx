/* eslint-disable import/named */
/* eslint-disable no-shadow */
import React, { useEffect } from "react"
import { FlatList, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import Hairline from "../../component/Hairline"
import Spinner from "../../component/Spinner"
import Screen from "../../layouts/Screen"
import { fetchInvoices } from "../../store/Invoices"
import { Colors, globalStyles, Text } from "../../Theme"
import navigatorUtil from "../../util/navigator-util"
import styles from "./Invoices.styles"

const Invoices = () => {
  const dispatch = useDispatch()
  const [loading, invoices, billingMethodAvailable] = useSelector(({ invoices }) => [
    invoices.invoices.loading,
    invoices.invoices.data || invoices.address.loading,
    invoices.billingMethodAvailable,
  ])

  useEffect(() => {
    dispatch(fetchInvoices())
  }, [dispatch])

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Invoices" }}
    >
      {loading ? (
        <Spinner size="large" color={Colors.primary} />
      ) : (
        <>
          {!billingMethodAvailable ? (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
              <Text style={{ fontSize: 16, textAlign: "center" }}>
                {`Invoice Address management is not available\nYou may set an invoice address once you have added a credit card to your account`}
              </Text>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  ...globalStyles.button,
                  marginHorizontal: 20,
                  alignSelf: "stretch",
                }}
                onPress={() => navigatorUtil.navigate("InvoicesAddressScreen")}
              >
                <Text style={{ color: "white", fontWeight: "900" }}>INVOICE ADDRESS</Text>
              </TouchableOpacity>
              <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={() => (
                  <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                    <Text style={{ fontSize: 16 }}>No invoices to show</Text>
                  </View>
                )}
                data={invoices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    underlayColor="#eee"
                    onPress={() => navigatorUtil.navigate("InvoicesInfoScreen", { item })}
                  >
                    <View>
                      <View style={styles.row}>
                        <View style={styles.tileDetails}>
                          <Text style={styles.text}>Number: {item.number}</Text>
                        </View>
                      </View>
                      <Hairline />
                    </View>
                  </TouchableHighlight>
                )}
              />
            </>
          )}
        </>
      )}
    </Screen>
  )
}

export default Invoices
