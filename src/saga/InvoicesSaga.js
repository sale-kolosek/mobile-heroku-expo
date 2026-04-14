/* eslint-disable import/named */
import { call, put, select } from "redux-saga/effects"

import { getInvoiceAddress, getInvoices, putInvoiceAddress } from "../service/Invoices"
import {
  FETCH_INVOICE_ADDRESS_FAILURE,
  FETCH_INVOICE_ADDRESS_SUCCESS,
  FETCH_INVOICES_FAILURE,
  FETCH_INVOICES_SUCCESS,
  SAVE_INVOICE_ADDRESS_FAILURE,
  SAVE_INVOICE_ADDRESS_SUCCESS,
} from "../store/Invoices"
import Toast from "../util/Toast"

export function* fetchInvoices() {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getInvoices, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (response && response.id && response.id === "unauthorized")
      throw new Error("Token is invalid")
    if (!response) {
      yield put({ type: FETCH_INVOICES_FAILURE, error: "No invoices available" })
    } else {
      yield put({ type: FETCH_INVOICES_SUCCESS, invoices: response })
    }
  } catch (error) {
    yield put({ type: FETCH_INVOICES_FAILURE, error: error.message })
    throw error
  }
}

export function* fetchInvoiceAddress() {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getInvoiceAddress, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (response && response.id && response.id === "unauthorized")
      throw new Error("Token is invalid")
    if (!response) {
      Toast.error(`Please add a billing method\non Heroku Web app`)
      yield put({
        type: FETCH_INVOICE_ADDRESS_FAILURE,
        error: "Please add a billing method on Heroku Web app",
      })
    } else if (response) {
      yield put({ type: FETCH_INVOICE_ADDRESS_SUCCESS, address: response })
    }
  } catch (error) {
    yield put({ type: FETCH_INVOICE_ADDRESS_FAILURE, error: error.message })
    throw error
  }
}

export function* saveInvoiceAddress({ address }) {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(putInvoiceAddress, {
      headers: { Authorization: `Bearer ${token}` },
      address: address.address,
    })
    yield put({ type: SAVE_INVOICE_ADDRESS_SUCCESS, address: response })
  } catch (error) {
    yield put({ type: SAVE_INVOICE_ADDRESS_FAILURE, error: error.message })
  }
}
