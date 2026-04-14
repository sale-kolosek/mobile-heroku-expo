/* eslint-disable import/named */
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"

import Hairline from "../../../component/Hairline"
import Spinner from "../../../component/Spinner"
import Screen from "../../../layouts/Screen"
import { deleteWebhook, fetchAppWebhook } from "../../../store/AppData"
import { Colors, globalStyles } from "../../../Theme"
import navigatorUtil from "../../../util/navigator-util"
import styles from "./WebhookInfo.styles"

const WebhookInfo = ({
  route: {
    params: { webhookID },
  },
}) => {
  const dispatch = useDispatch()
  const appID = useSelector(({ appData }) => appData.data.id)
  const webhook = useSelector(({ appData }) => appData.webhook)
  const loading = useSelector(({ appData }) => appData.webhookLoading)
  const [deleteWebhookLoading, setDeleteWebhookLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchAppWebhook(appID, webhookID))
  }, [appID, dispatch, webhookID])

  const handleDeleteWebhook = () => {
    setDeleteWebhookLoading(true)
    dispatch(deleteWebhook(appID, webhookID))
    setTimeout(() => {
      setDeleteWebhookLoading(false)
      navigatorUtil.pop()
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
        webhook && (
          <View>
            <View style={styles.tileStyle}>
              <Icon name="hexagon" style={{ ...globalStyles.icon, marginLeft: 10 }} />
              <View style={styles.dataStyle}>
                <Text style={styles.labelStyle}>Level</Text>
                <Text style={styles.textStyle}>{webhook.level}</Text>
              </View>
            </View>
            <Hairline />
            <View style={styles.tileStyle}>
              <Icon name="hexagon" style={{ ...globalStyles.icon, marginLeft: 10 }} />
              <View style={styles.dataStyle}>
                <Text style={styles.labelStyle}>URL</Text>
                <Text style={styles.textStyle}>{webhook.url}</Text>
              </View>
            </View>
            <Hairline />
            <View style={styles.tileStyle}>
              <Icon name="hexagon" style={{ ...globalStyles.icon, marginLeft: 10 }} />
              <View style={styles.dataStyle}>
                <Text style={styles.labelStyle}>Includes</Text>
                {webhook.include.map((element) => {
                  return (
                    <Text key={element} style={styles.textStyle}>
                      {element}
                    </Text>
                  )
                })}
              </View>
            </View>
            <Hairline />
            <TouchableOpacity
              style={{
                ...globalStyles.button,
                marginHorizontal: 20,
                alignSelf: "stretch",
                backgroundColor: Colors.error,
              }}
              onPress={() => handleDeleteWebhook()}
            >
              {deleteWebhookLoading ? (
                <Spinner size="small" color="white" />
              ) : (
                <Text style={{ color: "white", fontWeight: "bold" }}>DELETE</Text>
              )}
            </TouchableOpacity>
          </View>
        )
      )}
    </Screen>
  )
}

WebhookInfo.propTypes = {
  route: PropTypes.instanceOf(Object).isRequired,
}

export default WebhookInfo
