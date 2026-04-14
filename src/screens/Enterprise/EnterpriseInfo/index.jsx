/* eslint-disable no-shadow */
import PropTypes from "prop-types"
import React from "react"
import { FlatList, Text, TouchableHighlight, View } from "react-native"

import Screen from "../../../layouts/Screen"
import { globalStyles } from "../../../Theme"

const EnterpriseInfo = ({
  route: {
    params: { item = {} },
  },
}) => {
  const info = [
    {
      info: `${item.permissions.map((permission) => ` ${permission}`)}`,
      title: "Permissions: ",
      id: 1,
    },
    { info: `${item.trial}`, title: "Trial: ", id: 4 },
    { info: `${new Date(item.created_at).toString().slice(0, 15)}`, title: "Created At: ", id: 2 },
    { info: `${new Date(item.updated_at).toString().slice(0, 15)}`, title: "Updated At: ", id: 5 },
    { info: `${item.identity_provider.name}`, title: "Identity Provider Name: ", id: 6 },
    { info: `${item.identity_provider.owner.name}`, title: "Owner Name: ", id: 7 },
  ]

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: `${item.name}` }}
    >
      <View style={{ margin: 10, alignItems: "center", justifyContent: "center", flex: 1 }}>
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
      </View>
    </Screen>
  )
}

EnterpriseInfo.propTypes = {
  route: PropTypes.instanceOf(Object).isRequired,
}

export default EnterpriseInfo
