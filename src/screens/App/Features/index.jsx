/* eslint-disable import/named */
import React, { useEffect, useState } from "react"
import { Text, TouchableHighlight, View } from "react-native"
import { SwipeListView } from "react-native-swipe-list-view"
import { useDispatch, useSelector } from "react-redux"

import FeatureTile from "../../../component/FeatureTile"
import Spinner from "../../../component/Spinner"
import Screen from "../../../layouts/Screen"
import { fetchAppFeatures, toggleFeatureEnable } from "../../../store/AppData"
import { Colors, globalStyles } from "../../../Theme"
import navigatorUtil from "../../../util/navigator-util"
import styles from "./Features.styles"

const Features = () => {
  const dispatch = useDispatch()
  const appID = useSelector(({ appData }) => appData.data.id)
  const features = useSelector(({ appData }) => appData.features)
  const featuresLoading = useSelector(({ appData }) => appData.featuresLoading)
  const [toggleEnabledLoading, setToggleEnabledLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchAppFeatures(appID))
  }, [appID, dispatch])

  const handleToggleEnabled = (featureID, enabled) => {
    setToggleEnabledLoading(true)
    dispatch(toggleFeatureEnable(appID, featureID, { enabled: !enabled }))
    setTimeout(() => {
      setToggleEnabledLoading(false)
      dispatch(fetchAppFeatures(appID))
    }, 2000)
  }
  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Features" }}
    >
      {featuresLoading ? (
        <Spinner size="large" color={Colors.primary} />
      ) : (
        <SwipeListView
          friction={17}
          data={features}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No Features available</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor="#eee"
              onPress={() => navigatorUtil.navigate("FeatureInfo", { featureID: item.id })}
            >
              <FeatureTile item={item} />
            </TouchableHighlight>
          )}
          rightOpenValue={-120}
          stopRightSwipe={-120}
          closeOnRowBeginSwipe={false}
          disableRightSwipe
          renderHiddenItem={(rowData, rowMap) => {
            const { item } = rowData
            return (
              <View style={styles.hiddenBtnWrapper}>
                <TouchableHighlight
                  onPress={() => {
                    handleToggleEnabled(item.id, item.enabled)
                    rowMap[rowData.item.id].closeRow()
                  }}
                  style={item.enabled ? styles.underButtonDisable : styles.underButtonEnable}
                >
                  {toggleEnabledLoading ? (
                    <Spinner size="small" color="white" />
                  ) : (
                    <Text style={{ color: "white", marginRight: 5 }}>
                      {item.enabled ? "Disable" : "Enable"}
                    </Text>
                  )}
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
      )}
    </Screen>
  )
}

export default Features
