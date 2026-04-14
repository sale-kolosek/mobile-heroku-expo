/* eslint-disable no-console */
import NetInfo from "@react-native-community/netinfo"
import { useCallback, useEffect, useRef, useState } from "react"
import { AppState, Keyboard, Platform } from "react-native"

import Analytics from "./analytics-util"

/**
 * Initializes the connectivity listener for the app
 */
function initInternetConnectivityListener(callback) {
  NetInfo.addEventListener(callback)
}

async function cacheImages(images) {
  for (let i = 0; i < images.length; i++) {
    if (typeof image === "string") {
      Image.prefetch(images[i])
    } else {
      // await Image.prefetch(images[i]).downloadAsync();
    }
  }
}
/**
 * Returns appState wether its active or inactive
 *
 * @return {bool} appState
 */
function AppStateManager() {
  const [appState, setAppState] = useState(AppState.currentState)
  const handleAppStateChange = useCallback((nextAppState) => {
    if (nextAppState === "active") {
      Analytics.track(Analytics.Events.APP_FOREGROUND)
    } else if (nextAppState === "background") {
      Analytics.track(Analytics.Events.APP_BACKGROUND)
    }
    setAppState(nextAppState)
  }, [])

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange)
    return () => {
      AppState.removeEventListener("change", handleAppStateChange)
    }
  }, [handleAppStateChange])

  return appState
}

/**
 * Returns if the keyboard is open / closed
 *
 * @return {bool} isOpen
 */
function useKeyboardStatus() {
  const [isOpen, setIsOpen] = useState(false)
  const keyboardShowListener = useRef(null)
  const keyboardHideListener = useRef(null)

  useEffect(() => {
    keyboardShowListener.current = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setIsOpen(true),
    )
    keyboardHideListener.current = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setIsOpen(false),
    )

    return () => {
      keyboardShowListener.current.remove()
      keyboardHideListener.current.remove()
    }
  })

  return isOpen
}

export default {
  initInternetConnectivityListener,
  cacheImages,
  useKeyboardStatus,
  AppStateManager,
}
