/* eslint-disable no-shadow */
/* eslint-disable import/named */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react"
import { FlatList, Text, TouchableHighlight, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import Hairline from "../../component/Hairline"
import Spinner from "../../component/Spinner"
import Screen from "../../layouts/Screen"
import { fetchTeams } from "../../store/Teams"
import { Colors, globalStyles } from "../../Theme"
import navigatorUtil from "../../util/navigator-util"
import styles from "./Teams.styles"

const TeamsScreen = () => {
  const dispatch = useDispatch()
  const [loading, teams] = useSelector(({ teams }) => [teams.loading, teams.teams])

  useEffect(() => {
    dispatch(fetchTeams())
  }, [dispatch])

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Teams List" }}
    >
      {loading ? (
        <Spinner size="large" color={Colors.primary} />
      ) : (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
              <Text style={{ fontSize: 16 }}>This account is not a member of a team</Text>
            </View>
          )}
          data={teams}
          onRefresh={() => dispatch(fetchTeams())}
          refreshing={loading}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor="#eee"
              onPress={() => navigatorUtil.navigate("TeamInfoScreen", { item })}
            >
              <View>
                <View style={styles.row}>
                  <View style={styles.tileDetails}>
                    <Text style={styles.textTitle}>Team ID:</Text>
                    <Text style={styles.text}>{item.id}</Text>
                    <Text style={styles.textTitle}>Created At:</Text>
                    <Text style={styles.text}>{`${new Date(item.created_at)
                      .toString()
                      .slice(0, 15)}`}</Text>
                    <Text style={styles.textTitle}>Name:</Text>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.textTitle}>Role:</Text>
                    <Text style={styles.text}>{item.role}</Text>
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

export default TeamsScreen
