/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
import { call, put, select } from "redux-saga/effects"

import { getEnterpriseAccounts } from "../service/EnterpriseAccounts"
import {
  FETCH_ENTERPRISE_ACCOUNTS_FAILURE,
  FETCH_ENTERPRISE_ACCOUNTS_SUCCESS,
} from "../store/Enterprise"

export function* fetchEnterpriseAccounts() {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getEnterpriseAccounts, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response) throw new Error("Network error!")

    if (response && response.id && response.id === "unauthorized")
      throw new Error("Token is invalid")

    yield put({ type: FETCH_ENTERPRISE_ACCOUNTS_SUCCESS, accounts: response })
  } catch (error) {
    yield put({ type: FETCH_ENTERPRISE_ACCOUNTS_FAILURE, error: error.message })
    throw error
  }
}
