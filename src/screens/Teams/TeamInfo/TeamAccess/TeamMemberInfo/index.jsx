/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable import/named */
/* eslint-disable no-nested-ternary */
import React, { useState } from "react"
import { Modal, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import Spinner from "../../../../../component/Spinner"
import Screen from "../../../../../layouts/Screen"
import { updateTeamMembers } from "../../../../../store/Teams"
import { Colors, globalStyles } from "../../../../../Theme"
import styles from "./TeamMemberInfo.styles"

const TeamMemberInfo = ({
  route: {
    params: { member = {}, teamId = {} },
  },
}) => {
  const [loading] = useSelector(({ changedMember }) => [changedMember.loading])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [memberRole, setmemberRole] = useState(member.role)

  const dispatch = useDispatch()

  const handleChangeRole = (role) => {
    dispatch(
      updateTeamMembers({
        id: teamId,
        changedMember: { email: "strahinja@kolosek.com", role },
      }),
    )
    setmemberRole(role)
    setIsModalVisible(false)
  }

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Edit Team Member" }}
    >
      {loading ? (
        <Spinner size="large" color={Colors.primary} />
      ) : (
        <View>
          <View style={styles.container}>
            <Text style={styles.textTitle}>Name:</Text>
            <Text style={styles.text}>{member.user.name}</Text>
            <Text style={styles.textTitle}>Email:</Text>
            <Text style={styles.text}>{member.email}</Text>
            <Text style={styles.textTitle}>Role:</Text>
            <Text style={styles.text}>{memberRole}</Text>
          </View>
          <TouchableOpacity
            style={{ ...globalStyles.button, marginHorizontal: 15, marginTop: 0 }}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={{ color: "white", fontWeight: "900" }}>CHANGE ROLE</Text>
          </TouchableOpacity>
          <Modal animationType="fade" transparent visible={isModalVisible}>
            <View style={styles.outterStyling}>
              <View style={styles.innerStyling}>
                <Text style={styles.text}>Set role for this member</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                  <TouchableOpacity
                    style={globalStyles.button}
                    onPress={() => handleChangeRole("admin")}
                  >
                    <Text style={styles.modalButtonText}>admin</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={globalStyles.button}
                    onPress={() => handleChangeRole("member")}
                  >
                    <Text style={styles.modalButtonText}>member</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </Screen>
  )
}

export default TeamMemberInfo
