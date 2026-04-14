/* eslint-disable import/named */
import React, { useEffect } from "react"
import { FlatList, Text, TouchableHighlight, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import Hairline from "../../../component/Hairline"
import Spinner from "../../../component/Spinner"
import Screen from "../../../layouts/Screen"
import { fetchDynosSize } from "../../../store/AppData"
import { Colors, globalStyles } from "../../../Theme"
import styles from "./DynoSizeInfo.styles"

const DynoSizeInfo = () => {
  const dispatch = useDispatch()
  const dynosSizes = useSelector(({ appData }) => appData.dynosSize)
  const dynosSizeLoading = useSelector(({ appData }) => appData.dynosSizeLoading)

  useEffect(() => {
    dispatch(fetchDynosSize())
  }, [dispatch])

  return (
    <Screen
      withoutScrollView
      style={{
        ...globalStyles.container,
      }}
      headerProps={{ left: "back", title: "Dyno Size Info" }}
    >
      {dynosSizeLoading ? (
        <Spinner size="large" color={Colors.primary} />
      ) : (
        <FlatList
          data={dynosSizes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight underlayColor="#eee">
              <View>
                <View style={styles.row}>
                  <View style={styles.tileDetails}>
                    <Text style={styles.textTitle}>Name:</Text>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.textTitle}>Cost:</Text>
                    <Text style={styles.text}>{`${item.cost.cents / 100}$ charging ${
                      item.cost.unit
                    }`}</Text>
                    <Text style={styles.textTitle}>Memory:</Text>
                    <Text style={styles.text}>{`${item.memory} GB`}</Text>
                    <Text style={styles.textTitle}>Dyno Units:</Text>
                    <Text style={styles.text}>{item.dyno_units}</Text>
                    <Text style={styles.textTitle}>ID:</Text>
                    <Text style={styles.text}>{item.id}</Text>
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

export default DynoSizeInfo
