/* eslint-disable import/prefer-default-export */
/* eslint-disable import/named */
import { put, select } from "redux-saga/effects"

import { SET_INTERNET_CONNECTION_SUCCESS, STARTUP_SUCCESS } from "../store/Startup"
import appUtil from "../util/app-util"
import { getAccount } from "./AuthSaga"

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  const token = yield select(({ auth }) => auth.token)
  if (token) {
    yield* getAccount({ type: "startup" })
  }
  yield put({ type: STARTUP_SUCCESS })
}

export function* setInternetConnection() {
  let internetConnected
  appUtil.initInternetConnectivityListener((conn) => {
    internetConnected = conn.isConnected
  })
  yield put({ type: SET_INTERNET_CONNECTION_SUCCESS, internetConnected })
}
