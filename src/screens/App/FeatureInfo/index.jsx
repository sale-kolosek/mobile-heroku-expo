/* eslint-disable import/named */
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"

import Hairline from "../../../component/Hairline"
import Spinner from "../../../component/Spinner"
import Screen from "../../../layouts/Screen"
import { fetchAppFeature, toggleFeatureEnable } from "../../../store/AppData"
import { Colors, globalStyles } from "../../../Theme"
import styles from "./FeatureInfo.styles"

const FeatureInfo = ({
  route: {
    params: { featureID },
  },
}) => {
  const dispatch = useDispatch()
  const appID = useSelector(({ appData }) => appData.data.id)
  const feature = useSelector(({ appData }) => appData.feature)
  const loading = useSelector(({ appData }) => appData.featureLoading)
  const [toggleEnabledLoading, setToggleEnabledLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchAppFeature(appID, featureID))
  }, [appID, dispatch, featureID])

  const handleToggleEnabled = () => {
    setToggleEnabledLoading(true)
    dispatch(toggleFeatureEnable(appID, featureID, { enabled: !feature.enabled }))
    setTimeout(() => {
      setToggleEnabledLoading(false)
      dispatch(fetchAppFeature(appID, featureID))
    }, 2000)
  }
  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Feature" }}
    >
      {loading ? (
        <Spinner size="large" color={Colors.primary} />
      ) : (
        feature && (
          <View>
            <View style={styles.tileStyle}>
              <Icon name="hexagon" style={{ ...globalStyles.icon, marginLeft: 10 }} />
              <View style={styles.dataStyle}>
                <Text style={styles.labelStyle}>Name</Text>
                <Text style={styles.textStyle}>{feature.name}</Text>
              </View>
            </View>
            <Hairline />
            <View style={styles.tileStyle}>
              <Icon name="hexagon" style={{ ...globalStyles.icon, marginLeft: 10 }} />
              <View style={styles.dataStyle}>
                <Text style={styles.labelStyle}>Description</Text>
                <Text style={styles.textStyle}>{feature.description}</Text>
              </View>
            </View>
            <Hairline />
            <View style={styles.tileStyle}>
              <Icon name="hexagon" style={{ ...globalStyles.icon, marginLeft: 10 }} />
              <View style={styles.dataStyle}>
                <Text style={styles.labelStyle}>State</Text>
                <Text style={styles.textStyle}>{feature.state}</Text>
              </View>
            </View>
            <Hairline />
            <TouchableOpacity
              style={
                feature.enabled
                  ? {
                      ...globalStyles.button,
                      marginHorizontal: 20,
                      alignSelf: "stretch",
                      backgroundColor: Colors.error,
                    }
                  : {
                      ...globalStyles.button,
                      marginHorizontal: 20,
                      alignSelf: "stretch",
                      backgroundColor: Colors.success,
                    }
              }
              onPress={() => handleToggleEnabled()}
            >
              {toggleEnabledLoading ? (
                <Spinner size="small" color="white" />
              ) : (
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {feature.enabled ? "DISABLE" : "ENABLE"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )
      )}
    </Screen>
  )
}

FeatureInfo.propTypes = {
  route: PropTypes.instanceOf(Object).isRequired,
}

export default FeatureInfo
