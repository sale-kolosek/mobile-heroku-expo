/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable import/named */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react"
import { FlatList, Text, TouchableHighlight, View } from "react-native"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"

import Hairline from "../../../../component/Hairline"
import Spinner from "../../../../component/Spinner"
import Screen from "../../../../layouts/Screen"
import { fetchTeamMembers } from "../../../../store/Teams"
import { Colors, globalStyles } from "../../../../Theme"
import navigatorUtil from "../../../../util/navigator-util"

const TeamAccess = ({
  route: {
    params: { item = {} },
  },
}) => {
  const { id } = item
  const dispatch = useDispatch()
  const [loading, teamMembers, changedMember] = useSelector(({ teamMembers, changedMember }) => [
    teamMembers.loading,
    teamMembers.teamMembers,
    changedMember.changedMember,
  ])

  useEffect(() => {
    dispatch(fetchTeamMembers({ id }))
  }, [dispatch, id, changedMember])
  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Members List" }}
    >
      {loading ? (
        <Spinner size="large" color={Colors.primary} />
      ) : (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
              <Text style={{ fontSize: 16 }}>This team has no members.</Text>
            </View>
          )}
          data={teamMembers}
          refreshing={loading}
          onRefresh={() => dispatch(fetchTeamMembers({ id }))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor="#eee"
              onPress={() => navigatorUtil.navigate("TeamMemberInfo", { member: item, teamId: id })}
            >
              <View>
                <View style={globalStyles.row}>
                  <Icon name="account" style={globalStyles.icon} />
                  <Text style={globalStyles.itemTitle}>{item.email}</Text>
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

export default TeamAccess
