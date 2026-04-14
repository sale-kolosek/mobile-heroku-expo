/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
import { call, put, select } from "redux-saga/effects"

import { getApps, getAppsByCriteria } from "../service/Apps"
import { postInfo } from "../service/Internal"
import {
  FETCH_APPS_BY_CRITERIA_FAILURE,
  FETCH_APPS_BY_CRITERIA_SUCCESS,
  FETCH_APPS_FAILURE,
  FETCH_APPS_SUCCESS,
} from "../store/Apps"
import { SIGN_OUT } from "../store/Auth"
import navigatorUtil from "../util/navigator-util"
import Toast from "../util/Toast"

export function* fetchApps() {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getApps, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response) throw new Error("Network error!")

    if (response && response.id && response.id === "unauthorized") {
      navigatorUtil.replace("Auth")
      yield put({ type: SIGN_OUT })
      Toast.error("Token is invalid")
    }

    yield put({ type: FETCH_APPS_SUCCESS, apps: response })
  } catch (error) {
    yield put({ type: FETCH_APPS_FAILURE, error: error.message })
    throw error
  }
}

export function* fetchAppsByCriteria({ criterium }) {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getAppsByCriteria, {
      headers: { Authorization: `Bearer ${token}`, Range: `${criterium.criterium}` },
      postData: { in: { id: criterium.idList } },
    })
    if (!response) throw new Error("Network error!")

    if (response && response.id && response.id === "unauthorized")
      throw new Error("API Key is invalid or Range parameter is invalid!")

    yield put({ type: FETCH_APPS_BY_CRITERIA_SUCCESS, apps: response.data })
  } catch (error) {
    yield put({ type: FETCH_APPS_BY_CRITERIA_FAILURE, error: error.message })
    throw error
  }
}

function* sendInfo(body) {
  try {
    yield call(postInfo, body)
  } catch (error) {}
}
