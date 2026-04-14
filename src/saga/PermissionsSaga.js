/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
import { call, put, select } from "redux-saga/effects"

import { getPermissions } from "../service/Permissions"
import { FETCH_PERMISSIONS_FAILURE, FETCH_PERMISSIONS_SUCCESS } from "../store/Permissions"
import Toast from "../util/Toast"

export function* fetchPermissions({ permissions }) {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getPermissions, {
      headers: { Authorization: `Bearer ${token}` },
      teamID: permissions.id,
    })
    if (!response) throw new Error("Network error!")

    if (response?.id === "unauthorized") throw new Error("Token is invalid")
    if (response?.id === "not_found") {
      Toast.error(response.message)
      yield put({ type: FETCH_PERMISSIONS_FAILURE, error: response.message })
    } else {
      yield put({ type: FETCH_PERMISSIONS_SUCCESS, permissions: response })
      if (response.message) {
        Toast.error(response.message)
      }
    }
  } catch (error) {
    yield put({ type: FETCH_PERMISSIONS_FAILURE, error: error.message })
    throw error
  }
}
