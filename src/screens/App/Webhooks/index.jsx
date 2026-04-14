/* eslint-disable import/named */
import React, { useEffect } from "react"
import { Text, TouchableHighlight, View } from "react-native"
import { SwipeListView } from "react-native-swipe-list-view"
import { useDispatch, useSelector } from "react-redux"

import Spinner from "../../../component/Spinner"
import WebhookTile from "../../../component/WebhookTile"
import Screen from "../../../layouts/Screen"
import { deleteWebhook, fetchAppWebhooks } from "../../../store/AppData"
import { Colors, globalStyles } from "../../../Theme"
import navigatorUtil from "../../../util/navigator-util"
import styles from "./Webhooks.styles"

const Webhooks = () => {
  const dispatch = useDispatch()
  const appID = useSelector(({ appData }) => appData.data.id)
  const webhooks = useSelector(({ appData }) => appData.webhooks)
  const webhooksLoading = useSelector(({ appData }) => appData.webhooksLoading)

  useEffect(() => {
    dispatch(fetchAppWebhooks(appID))
  }, [appID, dispatch])

  const handleDeleteWebhook = (webhookID) => {
    dispatch(deleteWebhook(appID, webhookID))
  }

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Webhooks" }}
    >
      {webhooksLoading ? (
        <Spinner size="large" color={Colors.primary} />
      ) : (
        <SwipeListView
          friction={17}
          data={webhooks}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>No Webhooks Available</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor="#eee"
              onPress={() => navigatorUtil.navigate("WebhookInfo", { webhookID: item.id })}
            >
              <WebhookTile item={item} />
            </TouchableHighlight>
          )}
          leftOpenValue={120}
          stopLeftSwipe={120}
          rightOpenValue={-120}
          stopRightSwipe={-120}
          swipeToOpenPercent={15}
          swipeToClosePercent={15}
          previewDuration={400}
          previewOpenValue={-20}
          previewOpenDelay={2000}
          closeOnRowBeginSwipe={false}
          disableLeftSwipe={false}
          disableRightSwipe
          useFlatList
          renderHiddenItem={(rowData, rowMap) => {
            const { item } = rowData
            return (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: 2,
                }}
              >
                <TouchableHighlight
                  onPress={() => {
                    handleDeleteWebhook(item.id)
                  }}
                  style={styles.underButtonDisable}
                >
                  <Text style={{ color: "white", marginRight: 5 }}>Delete</Text>
                </TouchableHighlight>
              </View>
            )
          }}
        />
      )}
    </Screen>
  )
}

export default Webhooks
