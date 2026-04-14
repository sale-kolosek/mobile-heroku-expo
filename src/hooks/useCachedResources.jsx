/* eslint-disable import/named */
import { useEffect, useState } from "react"
import * as SplashScreen from "expo-splash-screen"
import { useDispatch, useSelector } from "react-redux"

import ENUMS from "../constants/ENUMS"
import { setInternetConnection, startup } from "../store/Startup"
import storageUtil from "../util/storage-util"
import usePrevious from "./usePrevious"

SplashScreen.preventAutoHideAsync()

export default function useCachedResources() {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    loading: true,
    token: undefined,
  })
  const [appLoading, userProfile] = useSelector(({ app, profile }) => [
    app.loading,
    profile.profile,
  ])

  const prevAppLoading = usePrevious(appLoading)
  const changeState = (newState) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }))
  }

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        dispatch(startup())
        const token = await storageUtil.getAsyncStorageItem(ENUMS.API_KEY)
        changeState({ token })
        dispatch(setInternetConnection())
      } catch (err) {
        // We might want to provide this error information to an error reporting service
      } finally {
        await SplashScreen.hideAsync()
        changeState({ loading: false })
      }
    }

    loadResourcesAndDataAsync()
  }, [dispatch])
  return state
}
