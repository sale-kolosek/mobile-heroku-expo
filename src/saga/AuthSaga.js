/* eslint-disable import/named */
import base64 from "react-native-base64"
import { all, call, put, select, take } from "redux-saga/effects"

import {
  getAccount as apiGetAccount,
  getAllDeviceAuthTokens as apiGetAllDeviceAuthTokens,
  resetPassword as apiResetPassword,
  signIn as apiSignIn,
  signOut as apiSignOut,
} from "../service/Auth"
// eslint-disable-next-line no-unused-vars
import { getPremium, postInfo, postPremium } from "../service/Internal"
import {
  GET_ACCOUNT_FAILURE,
  GET_ACCOUNT_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_OUT_FAILURE,
  SIGN_OUT_FROM_ALL_DEVICES_FAILURE,
  SIGN_OUT_FROM_ALL_DEVICES_SUCCESS,
  SIGN_OUT_SUCCESS,
  unlockPremium,
} from "../store/Auth"
import navigatorUtil from "../util/navigator-util"
import Toast from "../util/Toast"
import { fetchApps } from "./AppsSaga"
import { fetchProfile } from "./ProfileSaga"
import { addNewUserFS, getUserFS } from "../util/firestore-util"
import { isUserSubscriptionActive } from "../util/inapp-util"

function* sendInfo(body) {
  try {
    yield call(postInfo, body)
  } catch (error) {}
}

const checkIfPremium = async (body) => {
  try {
    const temp = await getPremium(body)
    return temp.map((f) => f.name)
  } catch (error) {}
}

export function* getAccount({ type, apiKey }) {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(apiGetAccount, {
      headers: { Authorization: `Bearer ${apiKey || token}` },
    })
    if (!response) {
      throw new Error("Network error!")
    }

    if (response && response.id && response.id === "unauthorized") {
      yield put({ type: SIGN_OUT })

      throw new Error("Token is invalid")
    }
    let [first_name, last_name, rest] = ["", "", ""]
    const { email, name, id } = response
    const { exists } = yield getUserFS(id)
    if (!exists && id) {
      yield addNewUserFS(id, response)
    }
    const userHasPremium = yield isUserSubscriptionActive(id)
    if (userHasPremium) {
      yield put(unlockPremium())
    }
    if (name) {
      ;[first_name, ...rest] = name.split(" ")
      last_name = rest.join(" ")
    }
    if (["signIn", "startup"].includes(type)) {
      yield* fetchApps()
      yield* fetchProfile()
      yield all(take(["FETCH_APPS_SUCCESS", "FETCH_APPS_FAILURE"]))
      const apps = yield select((state) => state.apps.apps)
      const userData = {
        ...response,
        apps,
      }
      yield* sendInfo({
        app_name: "Heroku",
        email,
        first_name,
        last_name,
        uuid: id,
        user_data: userData,
      })
    }
    const premium = yield checkIfPremium({ email, uuid: id, app_name: "Heroku" })
    yield put({
      type: GET_ACCOUNT_SUCCESS,
      data: response,
      token: apiKey || token,
      premium,
    })
  } catch (error) {
    yield put({ type: GET_ACCOUNT_FAILURE, error: error.message })
    const token = yield select(({ auth }) => auth.token)
    if (token) {
      yield put({ type: SIGN_OUT })
    }
  }
}

// export function* unlockPremium({ featureName }) {
//   try {
//     const email = yield select(({ auth }) => auth.data.email)
//     const uuid = yield select(({ auth }) => auth.data.id)
//     const body = {
//       email,
//       uuid,
//       app_name: "Heroku",
//       feature_name: featureName,
//     }
//     yield call(postPremium, body)
//   } catch {}
// }

export function* signIn({ details: { username, password } }) {
  try {
    const base64EncodedAuth = base64.encode(`${username}:${password}`)
    const response = yield call(apiSignIn, {
      headers: {
        Authorization: `Basic ${base64EncodedAuth}`,
      },
      description: "HerokuMng Login",
    })
    const authToken = response?.access_token?.token
    const authorizationId = response?.id
    if (authToken) {
      yield put({
        type: SIGN_IN_SUCCESS,
        token: authToken,
        authorizationId,
        data: response?.user,
      })
      Toast.success("Sign In successful!")
      navigatorUtil.replace("Root")
      yield* getAccount({ type: "signIn" })
      yield* fetchProfile()
    } else if (response.id === "unauthorized") {
      Toast.error(response?.message)
      yield put({ type: SIGN_IN_FAILURE, error: response?.message })
    } else if (response.id === "mfa_required" || response.id === "vaas_enrolled") {
      Toast.error(
        response?.message ===
          "Enabling MFA is required for your Heroku account. Please log in again and enable MFA when prompted. "
          ? "Enabling MFA is required for your Heroku account. Please log in again and enable MFA when prompted. Use Heroku offical website."
          : response?.message,
      )
      yield put({ type: SIGN_IN_FAILURE, error: response?.message })
    }
  } catch (error) {
    yield put({ type: SIGN_IN_FAILURE, error: error.message })
  }
}

export function* signOut({ token, authorizationId }) {
  try {
    const response = yield call(apiSignOut, {
      headers: { Authorization: `Bearer ${token}` },
      authorizationId,
    })
    if (response.id === "unauthorized") {
      yield put({ type: SIGN_OUT_FAILURE, error: response.message })
    } else {
      yield put({ type: SIGN_OUT_SUCCESS })
    }
  } catch (error) {
    yield put({ type: SIGN_OUT_FAILURE, error: error.message })
  }
}

export function* signOutFromAllDevices() {
  try {
    const [token, authorizationId] = yield select(({ auth }) => [auth.token, auth.authorizationId])
    const authTokensResponse = yield call(apiGetAllDeviceAuthTokens, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const authTokens = authTokensResponse.filter((a) => a.id !== authorizationId)
    if (authTokens.length === 0) {
      Toast.success("You are already signed out\nfrom other devices")
      yield put({
        type: SIGN_OUT_FROM_ALL_DEVICES_FAILURE,
        error: "You are already signed out from other devices",
      })
    } else {
      for (const authToken of authTokens) {
        yield call(apiSignOut, {
          headers: { Authorization: `Bearer ${authToken?.access_token?.token}` },
          authorizationId: authToken?.id,
        })
      }

      const authTokensAfterSignOut = yield call(apiGetAllDeviceAuthTokens, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (authTokensAfterSignOut.length > 1) {
        Toast.error("Sign out unsuccesfull")
        yield put({
          type: SIGN_OUT_FROM_ALL_DEVICES_FAILURE,
          error: "Sign Out Unsuccesfull",
        })
      } else if (authTokensAfterSignOut.length === 1) {
        Toast.success("Sign out succesfull!")
        yield put({ type: SIGN_OUT_FROM_ALL_DEVICES_SUCCESS })
      }
    }
  } catch (error) {
    Toast.error("Something went wrong")
    yield put({ type: SIGN_OUT_FROM_ALL_DEVICES_FAILURE, error: error.message })
  }
}

export function* resetPassword({ email }) {
  try {
    const [token] = yield select(({ auth }) => [auth.token])
    const response = yield call(apiResetPassword, {
      headers: { Authorization: `Bearer ${token}` },
      data: { email },
    })
    if (!response.ok) {
      Toast.error(response.message)
      yield put({ type: RESET_PASSWORD_FAILURE, error: response.message })
    } else {
      Toast.success("Recovery email sent!")
      yield put({ type: RESET_PASSWORD_SUCCESS })
    }
  } catch (error) {
    yield put({ type: RESET_PASSWORD_FAILURE, error: error.message })
  }
}
