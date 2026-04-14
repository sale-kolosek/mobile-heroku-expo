/* eslint-disable no-console */
/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import {
  SET_INTERNET_CONNECTION,
  SET_INTERNET_CONNECTION_SUCCESS,
  STARTUP,
  STARTUP_SUCCESS,
} from "./index"

const initialState = {
  internetConnected: false,
  loading: false,
  error: "",
}

const startup = (state) => ({
  ...state,
  loading: true,
  error: "",
})

const startupSuccess = (state) => ({
  ...state,
  loading: false,
  error: "",
})

const setInternetConnection = (state) => {
  return {
    ...state,
  }
}

const setInternetConnectionSuccess = (state, { internetConnected }) => {
  return {
    ...state,
    internetConnected,
  }
}

const StartupReducer = createReducer(initialState, {
  [STARTUP]: startup,
  [STARTUP_SUCCESS]: startupSuccess,

  [SET_INTERNET_CONNECTION]: setInternetConnection,
  [SET_INTERNET_CONNECTION_SUCCESS]: setInternetConnectionSuccess,
})

export default StartupReducer
