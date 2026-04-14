/* eslint-disable import/named */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import { ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Input } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"

import Screen from "../../../layouts/Screen"
import { fetchTeamInfo, saveTeamInfo } from "../../../store/Teams"
import { Colors, globalStyles } from "../../../Theme"
import navigatorUtil from "../../../util/navigator-util"
import styles from "./TeamInfo.styles"

const TeamInfo = ({
  route: {
    params: { item = {} },
  },
}) => {
  const dispatch = useDispatch()
  const [loading, teamInfo] = useSelector(({ teamInfo }) => [teamInfo.loading, teamInfo.teamInfo])
  const [isModalVisible, setisModalVisible] = useState(false)
  const [inputName, setInputName] = useState("")

  useEffect(() => {
    dispatch(fetchTeamInfo({ id: item.id }))
  }, [dispatch, item.id])

  const handleDefaultClick = (decision) => {
    if (decision !== teamInfo.default) {
      dispatch(
        saveTeamInfo({
          id: item.id,
          teamInfo: { default: decision },
        }),
      )
    }
    setisModalVisible(false)
  }

  const handleChangeName = () => {
    if (inputName.length > 0) {
      dispatch(
        saveTeamInfo({
          id: item.id,
          teamInfo: { name: inputName },
        }),
      )
    }
    setInputName("")
  }
  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Team Info" }}
    >
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ flexGrow: 1, alignSelf: "center" }}
          color={Colors.primary}
        />
      ) : (
        <ScrollView style={{ flexGrow: 1 }}>
          <View>
            {teamInfo.message ? (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.responseText}>{`${teamInfo.message}`}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => dispatch(fetchTeamInfo({ id: item.id }))}
                >
                  <Text style={styles.textButton}>Try Again</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                {teamInfo.role === "admin" && (
                  <View>
                    <TouchableOpacity
                      style={{ ...globalStyles.button, marginHorizontal: 15 }}
                      onPress={() => navigatorUtil.navigate("TeamApps", { item })}
                    >
                      <Text style={{ color: "white", fontWeight: "900" }}>TEAM APPS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ ...globalStyles.button, marginHorizontal: 15, marginTop: 0 }}
                      onPress={() => navigatorUtil.navigate("TeamAccess", { item })}
                    >
                      <Text style={{ color: "white", fontWeight: "900" }}>TEAM ACCESS</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <Text style={styles.textTitle}>Name:</Text>
                <Text style={styles.text}>{teamInfo.name}</Text>
                <View visible="false" style={{ marginLeft: 40, marginRight: 40 }}>
                  {teamInfo.role === "admin" && (
                    <View>
                      <Input
                        labelStyle={{ fontSize: 10, fontWeight: "normal" }}
                        inputStyle={{ padding: 0, fontSize: 14 }}
                        onChangeText={(text) => setInputName(text.toLowerCase().trim())}
                        placeholder="New Team Name"
                      />
                      <TouchableOpacity style={styles.button} onPress={() => handleChangeName()}>
                        <Text style={styles.textButton}>Rename</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <Text style={styles.textTitle}>Created At:</Text>
                <Text style={styles.text}>{`${new Date(teamInfo.created_at)
                  .toString()
                  .slice(0, 15)}`}</Text>
                <Text style={styles.textTitle}>Updated At:</Text>
                <Text style={styles.text}>{`${new Date(teamInfo.updated_at)
                  .toString()
                  .slice(0, 15)}`}</Text>
                <Text style={styles.textTitle}>Default:</Text>
                <View>
                  {teamInfo.role === "admin" ? (
                    <TouchableOpacity style={styles.button} onPress={() => setisModalVisible(true)}>
                      <Text style={styles.textButton}>{`${teamInfo.default}`}</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.text}>{`${teamInfo.default}`}</Text>
                  )}
                </View>
                <Text style={styles.textTitle}>Membership Limit:</Text>
                <Text style={styles.text}>{teamInfo.membership_limit}</Text>
                <Text style={styles.textTitle}>Role:</Text>
                <Text style={styles.text}>{teamInfo.role}</Text>
                <Text style={styles.textTitle}>Enterpise Account:</Text>
                <Text style={styles.text}>
                  {teamInfo.enterprise_account ?? "No Enterprise Account"}
                </Text>
                <Text style={styles.textTitle}>Identity Provider:</Text>
                <Text style={styles.text}>{`${teamInfo.identity_provider ?? "null"}`}</Text>
                <Text style={styles.textTitle}>Credit Card Collections:</Text>
                <Text style={styles.text}>{`${teamInfo.credit_card_collections}`}</Text>
                <Modal animationType="fade" transparent visible={isModalVisible}>
                  <View style={styles.outterStyling}>
                    <View style={styles.innerStyling}>
                      <Text>Do you want to set this team as default?</Text>
                      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <TouchableOpacity
                          style={globalStyles.button}
                          onPress={() => handleDefaultClick(true)}
                        >
                          <Text style={styles.modalButtonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={globalStyles.button}
                          onPress={() => handleDefaultClick(false)}
                        >
                          <Text style={styles.modalButtonText}>No</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Screen>
  )
}

export default TeamInfo
