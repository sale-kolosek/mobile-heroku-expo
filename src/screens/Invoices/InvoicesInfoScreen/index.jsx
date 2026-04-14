/* eslint-disable no-shadow */
/* eslint-disable import/named */
import PropTypes from "prop-types"
import React from "react"
import { FlatList, Text, TouchableHighlight, View } from "react-native"

import Screen from "../../../layouts/Screen"
import { globalStyles } from "../../../Theme"
import styles from "./InvoicesInfoScreen.styles"

const InvoicesInfoScreen = ({
  route: {
    params: { item = {} },
  },
}) => {
  const info = [
    { info: `${item.charges_total}`, title: "Charges Total: ", id: 1 },
    { info: `${item.credits_total}`, title: "Credits Total: ", id: 4 },
    { info: `${new Date(item.created_at).toString().slice(0, 15)}`, title: "Created At: ", id: 2 },
    { info: `${new Date(item.updated_at).toString().slice(0, 15)}`, title: "Updated At: ", id: 5 },
    {
      info: `${new Date(item.period_start).toString().slice(0, 15)}`,
      title: "Period Start: ",
      id: 6,
    },
    { info: `${new Date(item.period_end).toString().slice(0, 15)}`, title: "Period End: ", id: 7 },
  ]

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: `Invoice: ${item.number}` }}
    >
      <FlatList
        contentContainerStyle={styles.container}
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
    </Screen>
  )
}

InvoicesInfoScreen.propTypes = {
  route: PropTypes.instanceOf(Object).isRequired,
}

export default InvoicesInfoScreen
