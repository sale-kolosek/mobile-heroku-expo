/* eslint-disable no-shadow */
/* eslint-disable import/named */
import React, { useEffect } from "react"
import { FlatList, Text, TouchableHighlight, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import Hairline from "../../../component/Hairline"
import Spinner from "../../../component/Spinner"
import Screen from "../../../layouts/Screen"
import { fetchEnterpriseAccounts } from "../../../store/Enterprise"
import { Colors, globalStyles } from "../../../Theme"
import navigatorUtil from "../../../util/navigator-util"
import styles from "./EnterpriseAccount.styles"

const EnterpriseAccount = () => {
  const dispatch = useDispatch()
  const [loading, accounts] = useSelector(({ accounts }) => [accounts.loading, accounts.accounts])

  useEffect(() => {
    dispatch(fetchEnterpriseAccounts())
  }, [dispatch])

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Enterprise Account" }}
    >
      {loading ? (
        <Spinner size="large" style={{ flexGrow: 1, alignSelf: "center" }} color={Colors.primary} />
      ) : (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View
              style={{
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>No Enterprise Accounts to Show</Text>
            </View>
          )}
          data={accounts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor="#eee"
              onPress={() => navigatorUtil.navigate("EnterpriseInfoScreen", { item })}
            >
              <View>
                <View style={styles.row}>
                  <View style={styles.tileDetails}>
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                </View>
                <Hairline />
              </View>
            </TouchableHighlight>
          )}
        />
      )}
    </Screen>
  )
}

export default EnterpriseAccount
