/* eslint-disable import/named */
import { isEqual } from "lodash"
// import PropTypes from "prop-types"
import React, { useCallback, useEffect, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { Button } from "react-native-elements"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SwipeListView } from "react-native-swipe-list-view"
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"

import Spinner from "../../../../component/Spinner"
import usePrevious from "../../../../hooks/usePrevious"
import { fetchConfigVars, saveConfigVars } from "../../../../store/AppData"
import { Colors, Text } from "../../../../Theme"
import Toast from "../../../../util/Toast"
import styles from "./ConfigVars.styles"
import ConfigVarTile from "./ConfigVarTile"

const ConfigVars = () => {
  const dispatch = useDispatch()
  const insets = useSafeAreaInsets()

  const [loading, appID, appConfigVars] = useSelector(({ appData }) => [
    appData.configVarsLoading,
    appData.data.id,
    appData.configVars,
  ])
  const prevAppConfigVars = usePrevious([...appConfigVars])
  const prevLoading = usePrevious(loading)

  const [configVars, setConfigVars] = useState([...appConfigVars])
  const [showSaveBtn, setShowSaveBtn] = useState(false)

  const handleResetConfigVarsState = useCallback(() => {
    if (appConfigVars.length > 0 && !isEqual(prevAppConfigVars, appConfigVars)) {
      setConfigVars([...appConfigVars])
    }
    if (prevLoading && !loading) setShowSaveBtn(false)
  }, [appConfigVars, loading, prevAppConfigVars, prevLoading])

  useEffect(() => {
    handleResetConfigVarsState()
  }, [handleResetConfigVarsState])

  const editKey = (item, text) => {
    const temp = [...configVars]
    const configVar = temp.find((cv) => cv.originalKey === item.originalKey)
    configVar.key = text
    setConfigVars(temp)
  }

  const editVar = (item, text) => {
    setShowSaveBtn(true)
    const temp = [...configVars]
    const configVar = temp.find((cv) => cv.originalKey === item.originalKey)
    configVar.value = text
    setConfigVars(temp)
  }

  const removeVar = (originalKey) => {
    if (originalKey.includes("NEWVAR")) {
      setConfigVars(configVars.filter((cv) => cv.originalKey !== originalKey))
    } else {
      const configVar = configVars.find((cv) => cv.originalKey === originalKey)
      configVar.value = null
      dispatch(saveConfigVars(configVars))
    }
  }

  const handleAddNewConfigVar = () => {
    const newVar = { originalKey: `NEWVAR-${Math.random()}`, key: "", value: "" }
    const temp = [...configVars, newVar]
    setConfigVars(temp)
  }

  const configVarsHasChanges = !isEqual(configVars, appConfigVars)
  const stateNotSetYet = configVars.length === 0 && appConfigVars.length > 0
  return (
    <>
      {loading ? (
        <Spinner size="large" color={Colors.primary} />
      ) : (
        <>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollViewContainer}
            showsVerticalScrollIndicator={false}
            scrollEnabled
            enableAutomaticScroll
            extraHeight={150}
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
          >
            <SwipeListView
              friction={17}
              bounces={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 120 + insets.bottom,
              }}
              data={configVars}
              keyExtractor={(item) => item.originalKey}
              renderItem={({ item }) => (
                <ConfigVarTile item={item} editKey={editKey} editVar={editVar} />
              )}
              rightOpenValue={-120}
              stopRightSwipe={-120}
              swipeToOpenPercent={15}
              swipeToClosePercent={15}
              previewDuration={400}
              previewOpenValue={-20}
              previewOpenDelay={2000}
              closeOnRowBeginSwipe={false}
              disableRightSwipe
              useFlatList
              refreshing={loading}
              onRefresh={() => dispatch(fetchConfigVars(appID))}
              renderHiddenItem={(rowData) => {
                const { item } = rowData
                return (
                  <View style={styles.removeButtonContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        removeVar(item.originalKey)
                      }}
                      style={styles.underButton}
                      activeOpacity={0.7}
                    >
                      <Text style={{ color: "white", marginRight: 5 }}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
          </KeyboardAwareScrollView>

          {((!stateNotSetYet && configVarsHasChanges) || showSaveBtn) && (
            <Button
              containerStyle={styles.containerStyle2}
              buttonStyle={styles.buttonStyle2}
              style={styles.buttonStyle2}
              icon={<Icon name="check" style={styles.icon} />}
              onPress={() => {
                if (
                  configVars.some((configVar) => configVar.key === "" || configVar.value === "")
                ) {
                  Toast.error("Field cannot be empty!")
                } else {
                  dispatch(saveConfigVars(configVars))
                }
              }}
              testID="ConfigVar.Check"
            />
          )}

          <Button
            containerStyle={styles.containerStyle}
            buttonStyle={styles.buttonStyle}
            style={styles.buttonStyle}
            icon={<Icon name="plus" style={styles.icon} />}
            onPress={handleAddNewConfigVar}
            testID="ConfigVar.Plus"
          />
        </>
      )}
    </>
  )
}

export default ConfigVars
