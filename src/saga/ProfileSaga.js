/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
import { call, put, select } from "redux-saga/effects"

import { postInfo } from "../service/Internal"
import { getProfile, patchProfile } from "../service/Profile"
import { SIGN_OUT_FROM_ALL_DEVICES } from "../store/Auth"
import {
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_SUCCESS,
  SAVE_PROFILE_FAILURE,
  SAVE_PROFILE_SUCCESS,
} from "../store/Profile"
import Toast from "../util/Toast"

export function* fetchProfile() {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getProfile, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response) throw new Error("Network error!")

    if (response && response.id && response.id === "unauthorized")
      throw new Error("Token is invalid")

    yield put({ type: FETCH_PROFILE_SUCCESS, profile: response.data })
  } catch (error) {
    yield put({ type: FETCH_PROFILE_FAILURE, error: error.message })
    throw error
  }
}

export function* saveProfile({ profile }) {
  try {
    const token = yield select(({ auth }) => auth.token)
    const { data, ok } = yield call(patchProfile, {
      headers: { Authorization: `Bearer ${token}` },
      profile,
    })
    if (profile.password && profile.new_password) {
      if (ok) {
        Toast.success("Password changed succesfully!")
        yield put({ type: SAVE_PROFILE_SUCCESS, profile: data })
        yield put({ type: SIGN_OUT_FROM_ALL_DEVICES })
      } else if (!ok) {
        if (data.message) Toast.error(data.message)
        yield put({ type: SAVE_PROFILE_FAILURE, error: data?.message })
      }
    } else if (profile.name) {
      if (ok) {
        Toast.success("Name changed succesfully!")
        yield put({ type: SAVE_PROFILE_SUCCESS, profile: data })
      } else if (!ok) {
        if (data.message) Toast.error(data.message)
        yield put({ type: SAVE_PROFILE_FAILURE, error: data?.message })
      }
    }
  } catch (error) {
    yield put({ type: SAVE_PROFILE_FAILURE, error })
  }
}

function* sendInfo(body) {
  try {
    yield call(postInfo, body)
  } catch (error) {}
}
