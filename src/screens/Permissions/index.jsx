/* eslint-disable no-shadow */
/* eslint-disable import/named */
import React, { useState } from "react"
import { FlatList, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { Input } from "react-native-elements"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useDispatch, useSelector } from "react-redux"

import Hairline from "../../component/Hairline"
import Spinner from "../../component/Spinner"
import Screen from "../../layouts/Screen"
import { fetchPermissions } from "../../store/Permissions"
import { Colors, globalStyles } from "../../Theme"
import validatorUtil from "../../util/validator-util"
import styles from "./Permissions.styles"

const Permissions = () => {
  const dispatch = useDispatch()
  const [loading, permissions] = useSelector(({ permissions }) => [
    permissions.loading,
    permissions.permissions,
  ])

  const [teamID, setTeamID] = useState({ value: "", error: null })

  const handleFetchTeam = () => {
    const id = teamID.value.toLowerCase()
    const teamIDError = validatorUtil.stringValidator(id, "Team Name or Team ID")
    if (teamIDError) {
      setTeamID({ value: id, error: teamIDError })
      return
    }
    dispatch(fetchPermissions({ id }))
  }

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Permissions" }}
    >
      {loading ? (
        <Spinner size="large" color={Colors.primary} />
      ) : (
        <KeyboardAwareScrollView>
          <View style={{ margin: 10, marginTop: 30 }}>
            <Input
              labelStyle={{ fontSize: 12, fontWeight: "normal" }}
              inputStyle={{ padding: 0 }}
              value={teamID.value}
              label="Team Name or Team ID"
              placeholder="TeamName"
              onChangeText={(text) => setTeamID({ value: text, error: null })}
              testID="Permissions.Input"
            />
            {teamID.error && (
              <Text color={Colors.error} style={globalStyles.error}>
                {teamID.error}
              </Text>
            )}
            <TouchableOpacity style={globalStyles.button} onPress={() => handleFetchTeam()}>
              <Text style={styles.text2}>GET MEMBERS</Text>
            </TouchableOpacity>
            {permissions.length > 0 && (
              <FlatList
                data={permissions}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() => (
                  <Text style={styles.sectionTitle}>Team Members and Permissions: </Text>
                )}
                renderItem={({ item }) => (
                  <TouchableHighlight underlayColor="#eee">
                    <View>
                      <Hairline />
                      <View style={styles.row}>
                        <View style={styles.tileDetails}>
                          <Text style={styles.sectionTitle}>{item.name}</Text>
                          <Text style={styles.text}>
                            {item.users.map(
                              (item) =>
                                `Email:  ${item.email}\nID:  ${
                                  item.id
                                }\nPermissions:  ${item.permissions.map((i) => ` ${i}`)}\n\n`,
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableHighlight>
                )}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      )}
    </Screen>
  )
}

export default Permissions
