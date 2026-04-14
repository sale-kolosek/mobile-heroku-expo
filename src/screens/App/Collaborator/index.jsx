/* eslint-disable no-shadow */
/* eslint-disable import/named */
import PropTypes from "prop-types"
import React from "react"
import { FlatList, Text, TouchableHighlight, View } from "react-native"

import Screen from "../../../layouts/Screen"
import { Colors, globalStyles } from "../../../Theme"

const CollaboratorScreen = ({
  route: {
    params: { item = {} },
  },
}) => {
  const info = [
    { info: `${item.name}`, title: "Name: ", id: 1 },
    { info: `${new Date(item.createdAt).toString().slice(0, 15)}`, title: "Created At: ", id: 2 },
    { info: `${item.role}`, title: "Role: ", id: 3 },
    { info: `${item.email}`, title: "Email: ", id: 4 },
  ]

  // eslint-disable-next-line no-unused-vars
  const handleEditCollaborator = () => {}

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Collaborator Info" }}
    >
      <FlatList
        contentContainerStyle={{ borderBottomWidth: 1, borderBottomColor: Colors.darkGreyBorder }}
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

CollaboratorScreen.propTypes = {
  route: PropTypes.instanceOf(Object).isRequired,
}

export default CollaboratorScreen
