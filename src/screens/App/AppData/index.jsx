/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable no-nested-ternary */
import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { SwipeListView } from "react-native-swipe-list-view"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"

import Hairline from "../../../component/Hairline"
import ReleaseTile from "../../../component/ReleaseTile"
import UnderButton from "../../../component/UnderButton"
import Screen from "../../../layouts/Screen"
import { fetchAppData, rollback } from "../../../store/AppData"
import { previewReleases, unlockPremium } from "../../../store/Auth"
import { Text } from "../../../Theme"
import navigatorUtil from "../../../util/navigator-util"
import { PurchasePremiumPlan } from "../../../util/inapp-util"
import PremiumLoader from "../../../component/PremiumLoader"

const AppData = ({
  route: {
    params: { app = {} },
  },
}) => {
  const dispatch = useDispatch()
  const [loading, releases, releasesPreviewed, premium, userProfile] = useSelector(
    ({ appData, auth, profile }) => [
      appData.loading,
      appData.releases || [],
      auth.releasesPreviewed,
      auth.premium,
      profile.profile,
    ],
  )
  const [loadingPayment, setLoadingPayment] = useState(false)

  useEffect(() => {
    dispatch(fetchAppData(app.id))
    setTimeout(() => {
      dispatch(previewReleases(app.id))
    }, 2000)
  }, [app.id, dispatch])

  const handleRollbackClick = (appId, itemId) => {
    dispatch(rollback(appId, itemId))
  }

  return (
    <Screen withoutScrollView headerProps={{ title: app.name, left: "back", right: "appSettings" }}>
      <SwipeListView
        friction={17}
        contentContainerStyle={[
          { flexGrow: 1 },
          releases.length > 0 && { borderBottomWidth: 1, borderBottomColor: "#eee" },
        ]}
        previewRowKey={
          releasesPreviewed
            ? undefined
            : releases.length > 1
            ? releases[1].id
            : releases.length > 0
            ? releases[0].id
            : undefined
        }
        previewDuration={400}
        previewOpenValue={-20}
        previewOpenDelay={2000}
        data={releases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReleaseTile item={item} />}
        ListEmptyComponent={() => !loading && <Text>No Releases</Text>}
        renderHiddenItem={(rowData, rowMap) => {
          const { item } = rowData
          return (
            <UnderButton
              onPress={async () => {
                if (!premium) {
                  setLoadingPayment(true)
                  await PurchasePremiumPlan({
                    userID: userProfile.id,
                    onSuccess: () => {
                      setLoadingPayment(false)
                      handleRollbackClick(app.id, item.id)
                      rowMap[rowData.item.id].closeRow()
                      dispatch(unlockPremium())
                    },
                  })
                  setLoadingPayment(false)
                } else {
                  handleRollbackClick(app.id, item.id)
                  rowMap[rowData.item.id].closeRow()
                }
              }}
            >
              <Icon name="restart" style={{ fontSize: 20 }} />
              ROLL BACK
            </UnderButton>
          )
        }}
        ItemSeparatorComponent={() => <Hairline />}
        leftOpenValue={120}
        stopLeftSwipe={120}
        closeOnRowBeginSwipe
        disableLeftSwipe
        useNativeDriver
        onRefresh={() => dispatch(fetchAppData(app.id))}
        refreshing={loading}
        swipeToOpenPercent={15}
        swipeToClosePercent={15}
      />
      <PremiumLoader loading={loadingPayment} />
    </Screen>
  )
}

AppData.propTypes = {
  route: PropTypes.instanceOf(Object).isRequired,
}

export default AppData
