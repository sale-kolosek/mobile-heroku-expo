/* eslint-disable import/named */
import React, { useEffect } from "react"
import { Text, TouchableHighlight, View } from "react-native"
import { Button } from "react-native-elements"
import { SwipeListView } from "react-native-swipe-list-view"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"

import Collabolator from "../../../component/Collaborator"
import Screen from "../../../layouts/Screen"
import { fetchCollaborators, removeCollaborator } from "../../../store/AppData"
import { globalStyles } from "../../../Theme"
import navigatorUtil from "../../../util/navigator-util"
import styles from "./Collaborators.styles"

const Collaborators = () => {
  const dispatch = useDispatch()
  const appID = useSelector(({ appData }) => appData.data.id)
  const collaborators = useSelector(({ appData }) => appData.collaborators)

  useEffect(() => {
    dispatch(fetchCollaborators(appID))
  }, [appID, dispatch])

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Access" }}
    >
      <SwipeListView
        friction={17}
        data={collaborators}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableHighlight
            underlayColor="#eee"
            onPress={() => navigatorUtil.navigate("CollaboratorScreen", { item })}
          >
            <Collabolator item={item} />
          </TouchableHighlight>
        )}
        rightOpenValue={-120}
        stopRightSwipe={-120}
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
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                marginBottom: 2,
              }}
            >
              <TouchableHighlight
                onPress={() => {
                  dispatch(removeCollaborator(appID, item.id))
                  rowMap[rowData.item.id].closeRow()
                }}
                style={styles.underButton}
              >
                <Text style={{ color: "white", marginRight: 5 }}>Remove</Text>
              </TouchableHighlight>
            </View>
          )
        }}
        previewDuration={400}
        previewOpenValue={-20}
        previewOpenDelay={2000}
        swipeToOpenPercent={15}
        swipeToClosePercent={15}
      />
      <Button
        containerStyle={styles.containerStyle}
        buttonStyle={styles.buttonStyle}
        style={styles.buttonStyle}
        icon={<Icon name="plus" style={{ flex: 1, marginLeft: 5, fontSize: 24, color: "white" }} />}
        onPress={() => navigatorUtil.navigate("AddCollaborator")}
      />
    </Screen>
  )
}

export default Collaborators
