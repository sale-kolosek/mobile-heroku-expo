/* eslint-disable import/named */
import React, { useEffect } from "react"
import { FlatList, Text, TouchableHighlight, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import Hairline from "../../../component/Hairline"
import Spinner from "../../../component/Spinner"
import Screen from "../../../layouts/Screen"
import { fetchDynos } from "../../../store/AppData"
import { Colors, globalStyles } from "../../../Theme"
import navigatorUtil from "../../../util/navigator-util"
import styles from "./Dynos.styles"

const Dynos = () => {
  const dispatch = useDispatch()
  const appID = useSelector(({ appData }) => appData.data.id)
  const dynos = useSelector(({ appData }) => appData.dynos)
  const dynosLoading = useSelector(({ appData }) => appData.dynosLoading)

  useEffect(() => {
    dispatch(fetchDynos(appID))
  }, [appID, dispatch])

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Dyno List" }}
    >
      {dynosLoading ? (
        <Spinner size="large" color={Colors.primary} />
      ) : (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View style={styles.centerItem}>
              <Text style={styles.infoText}>No Dynos to Show</Text>
            </View>
          )}
          data={dynos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor="#eee"
              onPress={() => navigatorUtil.navigate("DynoSizeInfoScreen", { item })}
            >
              <View>
                <View style={styles.row}>
                  <View style={styles.tileDetails}>
                    <Text style={styles.textTitle}>Name:</Text>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.textTitle}>ID:</Text>
                    <Text style={styles.text}>{item.id}</Text>
                    <Text style={styles.textTitle}>Created At:</Text>
                    <Text style={styles.text}>{`${new Date(item.created_at)
                      .toString()
                      .slice(0, 15)}`}</Text>
                    <Text style={styles.textTitle}>Updated At:</Text>
                    <Text style={styles.text}>{`${new Date(item.updated_at)
                      .toString()
                      .slice(0, 15)}`}</Text>
                    <Text style={styles.textTitle}>Attach URL:</Text>
                    <Text style={styles.text}>{item.attach_url ?? "none"}</Text>
                    <Text style={styles.textTitle}>Command:</Text>
                    <Text style={styles.text}>{item.command}</Text>
                    <Text style={styles.textTitle}>Release:</Text>
                    <Text style={styles.text}>{item.release.version}</Text>
                    <Text style={styles.textTitle}>Size:</Text>
                    <Text style={styles.text}>{item.size}</Text>
                    <Text style={styles.textTitle}>State:</Text>
                    <Text style={styles.text}>{item.state}</Text>
                    <Text style={styles.textTitle}>Type:</Text>
                    <Text style={styles.text}>{item.type}</Text>
                  </View>
                </View>
                <Hairline />
              </View>
            </TouchableHighlight>
          )}
        />
      )}
    </Screen>
  )
}

export default Dynos
