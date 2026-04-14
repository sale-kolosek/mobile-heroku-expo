/* eslint-disable import/named */
import moment from "moment"
import React, { useEffect } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Button } from "react-native-elements"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"

import Hairline from "../../component/Hairline"
import Spinner from "../../component/Spinner"
import Screen from "../../layouts/Screen"
import { signOutFromAllDevices } from "../../store/Auth"
import { fetchProfile } from "../../store/Profile"
import { Colors, globalStyles } from "../../Theme"
import navigatorUtil from "../../util/navigator-util"
import styles from "./Profile.styles"

const Profile = () => {
  const dispatch = useDispatch()
  const [authLoading, loading, userProfile] = useSelector(({ auth, profile }) => [
    auth.loading,
    profile.loading,
    profile.profile,
  ])

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Your Profile" }}
    >
      {loading ? (
        <Spinner size="large" color={Colors.primary} />
      ) : (
        <View>
          <View style={styles.tileStyle}>
            <Icon name="account" style={globalStyles.largeIconGrey} />
            <View style={styles.dataStyle}>
              <Text style={styles.labelStyle}>Name</Text>
              <Text style={styles.textStyle}>{`${userProfile.name}`}</Text>
            </View>
            <Button
              containerStyle={styles.editButton}
              buttonStyle={styles.containerStyle}
              style={styles.editButton}
              icon={<Icon name="pencil" style={globalStyles.largeIconGrey} />}
              onPress={() => navigatorUtil.navigate("EditProfileName", "profile", userProfile)}
            />
          </View>
          <Hairline />
          <View style={styles.tileStyle}>
            <Icon name="calendar-range" style={globalStyles.largeIconGrey} />
            <View style={styles.dataStyle}>
              <Text style={styles.labelStyle}>Profile Creation Date</Text>
              <Text style={styles.textStyle}>
                {moment(userProfile.created_at).format("MMMM Do YYYY")}
              </Text>
            </View>
          </View>
          <Hairline />
          <View style={styles.tileStyle}>
            <Icon name="earth" style={globalStyles.largeIconGrey} />
            <View style={styles.dataStyle}>
              <Text style={styles.labelStyle}>Country</Text>
              <Text style={styles.textStyle}>{`${userProfile.country_of_residence}`}</Text>
            </View>
          </View>
          <Hairline />
          <View style={styles.tileStyle}>
            <Icon name="email" style={globalStyles.largeIconGrey} />
            <View style={styles.dataStyle}>
              <Text style={styles.labelStyle}>Email</Text>
              <Text style={styles.textStyle}>{`${userProfile.email}`}</Text>
            </View>
          </View>
          <Hairline />
          <TouchableOpacity
            style={{
              ...globalStyles.button,
              marginHorizontal: 20,
              alignSelf: "stretch",
            }}
            onPress={() => navigatorUtil.navigate("EditProfilePassword")}
            testID="ChangePassword.Button"
          >
            <Text style={{ color: "white", fontWeight: "900" }}>CHANGE PASSWORD</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={authLoading}
            style={{
              ...globalStyles.button,
              marginTop: 0,
              marginHorizontal: 20,
              alignSelf: "stretch",
            }}
            onPress={() => dispatch(signOutFromAllDevices())}
            testID="ChangePassword.Button"
          >
            {authLoading ? (
              <Spinner />
            ) : (
              <Text style={{ color: "white", fontWeight: "900" }}>
                SIGN OUT FROM ALL OTHER DEVICES
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  )
}

export default Profile
