/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable import/named */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react"
import { FlatList, Text, View } from "react-native"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"

import Hairline from "../../../../component/Hairline"
import Spinner from "../../../../component/Spinner"
import Screen from "../../../../layouts/Screen"
import { fetchPermissions } from "../../../../store/Permissions"
import { Colors, globalStyles } from "../../../../Theme"

const TeamApps = ({
  route: {
    params: { item = {} },
  },
}) => {
  const { id } = item
  const dispatch = useDispatch()
  const [loading, permissions] = useSelector(({ permissions }) => [
    permissions.loading,
    permissions.permissions,
  ])

  useEffect(() => {
    dispatch(fetchPermissions({ id }))
  }, [dispatch, id])

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: `Team Apps` }}
    >
      {loading ? (
        <Spinner size="large" color={Colors.primary} />
      ) : (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
              <Text style={{ fontSize: 16 }}>This team has no apps.</Text>
            </View>
          )}
          data={permissions}
          onRefresh={() => dispatch(fetchPermissions({ id }))}
          refreshing={loading}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <View style={globalStyles.row}>
                <Icon name="hexagon" style={globalStyles.icon} />
                <Text style={globalStyles.itemTitle}>{item.name}</Text>
              </View>
              <Hairline />
            </View>
          )}
        />
      )}
    </Screen>
  )
}

export default TeamApps
