/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable import/named */
import { call, put, select } from "redux-saga/effects"

import {
  deleteCollaborator,
  deleteWebhook,
  getAppData,
  getAppFeature,
  getAppFeatures,
  getAppWebhook,
  getAppWebhooks,
  getCollaborators,
  getConfigVars,
  getDynos,
  getDynosSize,
  inviteCollaborator,
  patchConfigVars,
  restartAllDynos as apiRestartAllDynos,
  restartDyno as apiRestartDyno,
  rollback as apiRollback,
  toggleFeatureEnable,
} from "../service/Apps"
import {
  CREATE_COLLABORATOR_FAILURE,
  CREATE_COLLABORATOR_SUCCESS,
  DELETE_WEBHOOK_FAILURE,
  DELETE_WEBHOOK_SUCCESS,
  FETCH_APP_DATA_FAILURE,
  FETCH_APP_DATA_SUCCESS,
  FETCH_APP_FEATURE_FAILURE,
  FETCH_APP_FEATURE_SUCCESS,
  FETCH_APP_FEATURES_FAILURE,
  FETCH_APP_FEATURES_SUCCESS,
  FETCH_APP_WEBHOOK_FAILURE,
  FETCH_APP_WEBHOOK_SUCCESS,
  FETCH_APP_WEBHOOKS_FAILURE,
  FETCH_APP_WEBHOOKS_SUCCESS,
  FETCH_COLLABORATORS_FAILURE,
  FETCH_COLLABORATORS_SUCCESS,
  FETCH_CONFIG_VARS_FAILURE,
  FETCH_CONFIG_VARS_SUCCESS,
  FETCH_DYNOS_FAILURE,
  FETCH_DYNOS_SIZE_FAILURE,
  FETCH_DYNOS_SIZE_SUCCESS,
  FETCH_DYNOS_SUCCESS,
  REMOVE_COLLABORATOR_FAILURE,
  REMOVE_COLLABORATOR_SUCCESS,
  RESTART_ALL_DYNOS_FAILURE,
  RESTART_ALL_DYNOS_SUCCESS,
  RESTART_DYNO_FAILURE,
  RESTART_DYNO_SUCCESS,
  ROLLBACK_FAILURE,
  ROLLBACK_SUCCESS,
  SAVE_CONFIG_VARS_FAILURE,
  SAVE_CONFIG_VARS_SUCCESS,
  TOGGLE_FEATURE_ENABLE_FAILURE,
  TOGGLE_FEATURE_ENABLE_SUCCESS,
} from "../store/AppData"
import Toast from "../util/Toast"

export function* fetchAppData({ appID }) {
  const token = yield select(({ auth }) => auth.token)
  try {
    const response = yield call(getAppData, {
      headers: { Authorization: `Bearer ${token}`, Range: "; max=1000, order=desc" },
      appID,
    })
    if (!response) throw new Error("Network error!")

    if (response && response.id && response.id === "unauthorized")
      throw new Error("Token is invalid")

    const data = yield select(({ apps }) => apps.apps.find((app) => app.id === appID))
    const releases = response
    yield put({ type: FETCH_APP_DATA_SUCCESS, releases, data })
  } catch (error) {
    yield put({ type: FETCH_APP_DATA_FAILURE, error: error.message })
    throw error
  }
}

export function* restartDyno({ appID, dynoID }) {
  const token = yield select(({ auth }) => auth.token)
  try {
    const response = yield call(apiRestartDyno, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
      dynoID,
    })

    if (response.ok) yield put({ type: RESTART_DYNO_SUCCESS, appID, dynoID })
    else throw new Error(response.message)
  } catch (error) {
    yield put({ type: RESTART_DYNO_FAILURE, error: error.message })
  }
}

export function* restartAllDynos({ appID }) {
  const token = yield select(({ auth }) => auth.token)
  try {
    const response = yield call(apiRestartAllDynos, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
    })

    if (response.ok) {
      Toast.success("Dynos restarted!")

      yield put({ type: RESTART_ALL_DYNOS_SUCCESS, appID })
      // const apps = yield select(({ apps }) => apps.apps)
      // const app = apps.find((app) => app.id === appID).name

    } else if (response.message) {
      yield put({ type: RESTART_ALL_DYNOS_FAILURE, error: response.data?.message })
      Toast.error(response.message)
    } else {
      yield put({ type: RESTART_ALL_DYNOS_FAILURE, error: response.data?.message })
      Toast.error("Restart failed")
    }
  } catch (error) {
    yield put({ type: RESTART_ALL_DYNOS_FAILURE, error: error.message })
  }
}

export function* rollback({ appID, releaseID }) {
  const token = yield select(({ auth }) => auth.token)
  try {
    const response = yield call(apiRollback, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
      releaseID,
    })

    if (response.ok) {
      yield put({ type: ROLLBACK_SUCCESS, release: response.data })
      Toast.success("Rollback successful")
      // const apps = yield select(({ apps }) => apps.apps)
      // const releases = yield select(({ appData }) => appData.releases)
      // const { version } = releases.find((release) => release.id === releaseID)

      // analytics().logEvent('user_app_rollback', { app, version })
    } else if (response.data?.message) {
      Toast.error(response.data?.message)
      yield put({ type: ROLLBACK_FAILURE, error: response.data?.message })
    } else throw new Error(response.data?.message)
  } catch (error) {
    Toast.error(error.message)
    yield put({ type: ROLLBACK_FAILURE, error: error.message })
  }
}

export function* fetchConfigVars({ appID }) {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getConfigVars, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
    })
    const configVars = Object.entries(response.data).map((entry) => ({
      originalKey: entry[0],
      key: entry[0],
      value: entry[1],
    }))
    yield put({ type: FETCH_CONFIG_VARS_SUCCESS, configVars })
  } catch (error) {
    yield put({ type: FETCH_CONFIG_VARS_FAILURE, error })
  }
}

export function* fetchCollaborators({ appID }) {
  try {
    const token = yield select(({ auth }) => auth.token)

    const response = yield call(getCollaborators, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
    })

    const collaborators = response.data.map((entry) => ({
      email: entry.user.email,
      id: entry.user.id,
      name: entry.app.name,
      createdAt: entry.created_at,
      role: entry.role,
    }))

    yield put({ type: FETCH_COLLABORATORS_SUCCESS, collaborators })
  } catch (error) {
    yield put({ type: FETCH_COLLABORATORS_FAILURE, error })
  }
}

export function* createCollaborator({ appID, userID }) {
  const token = yield select(({ auth }) => auth.token)
  try {
    const response = yield call(inviteCollaborator, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
      userID,
    })

    const { user } = response.data

    if (response.ok) {
      yield put({ type: CREATE_COLLABORATOR_SUCCESS, user })
    } else throw new Error(release.message)
  } catch (error) {
    yield put({ type: CREATE_COLLABORATOR_FAILURE, error: error.message })
  }
}

export function* removeCollaborator({ appID, userID }) {
  const token = yield select(({ auth }) => auth.token)
  try {
    const response = yield call(deleteCollaborator, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
      userID,
    })

    if (response.ok) {
      yield put({ type: REMOVE_COLLABORATOR_SUCCESS, userID })
    } else throw new Error(response.message)
  } catch (error) {
    yield put({ type: REMOVE_COLLABORATOR_FAILURE, error: error.message })
  }
}

export function* saveConfigVars({ configVars }) {
  try {
    const temp = {}
    configVars.forEach((element) => {
      if (element.key) temp[element.key] = element.value
    })
    const [token, appID] = yield select(({ auth, appData }) => [auth.token, appData.data.id])
    const response = yield call(patchConfigVars, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
      configVars: temp,
    })
    result = Object.entries(response.data).map((entry) => ({
      originalKey: entry[0],
      key: entry[0],
      value: entry[1],
    }))
    yield put({ type: SAVE_CONFIG_VARS_SUCCESS, configVars: result })
  } catch (error) {
    yield put({ type: SAVE_CONFIG_VARS_FAILURE, error })
  }
}

export function* fetchAppFeatures({ appID }) {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getAppFeatures, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
    })
    yield put({ type: FETCH_APP_FEATURES_SUCCESS, features: response.data })
  } catch (error) {
    yield put({ type: FETCH_APP_FEATURES_FAILURE, error })
  }
}

export function* toggleFeatureEnabled({ appID, featureID, enabled }) {
  const token = yield select(({ auth }) => auth.token)
  try {
    const response = yield call(toggleFeatureEnable, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
      featureID,
      enabled,
    })
    if (response.ok) {
      yield put({ type: TOGGLE_FEATURE_ENABLE_SUCCESS, feature: response.data })
      Toast.success("Action successful")
    } else throw new Error(feature.message)
  } catch (error) {
    Toast.error("Chosen feature can't be enabled/disabled!")
    yield put({ type: TOGGLE_FEATURE_ENABLE_FAILURE, error: error.message })
  }
}

export function* fetchDynos({ appID }) {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getDynos, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
    })
    yield put({ type: FETCH_DYNOS_SUCCESS, dynos: response.data })
  } catch (error) {
    yield put({ type: FETCH_DYNOS_FAILURE, error })
  }
}

export function* fetchDynosSize() {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getDynosSize, {
      headers: { Authorization: `Bearer ${token}` },
    })
    yield put({ type: FETCH_DYNOS_SIZE_SUCCESS, dynosSize: response.data })
  } catch (error) {
    yield put({ type: FETCH_DYNOS_SIZE_FAILURE, error })
  }
}

export function* fetchAppFeature({ appID, featureID }) {
  const token = yield select(({ auth }) => auth.token)
  try {
    const response = yield call(getAppFeature, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
      featureID,
    })
    if (response.ok) {
      yield put({ type: FETCH_APP_FEATURE_SUCCESS, feature: response.data })
    } else throw new Error(feature.message)
  } catch (error) {
    yield put({ type: FETCH_APP_FEATURE_FAILURE, error: error.message })
  }
}

export function* fetchAppWebhooks({ appID }) {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getAppWebhooks, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
    })
    yield put({ type: FETCH_APP_WEBHOOKS_SUCCESS, webhooks: response.data })
  } catch (error) {
    yield put({ type: FETCH_APP_WEBHOOKS_FAILURE, error })
  }
}

export function* removeWebhook({ appID, webhookID }) {
  const token = yield select(({ auth }) => auth.token)
  try {
    const response = yield call(deleteWebhook, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
      webhookID,
    })

    if (response.ok) {
      yield put({ type: DELETE_WEBHOOK_SUCCESS, webhookID })
      Toast.success("Webhook removed!")
    } else throw new Error(response.message)
  } catch (error) {
    Toast.error("Error deleting webhook!")
    yield put({ type: DELETE_WEBHOOK_FAILURE, error: error.message })
  }
}

export function* fetchAppWebhook({ appID, webhookID }) {
  const token = yield select(({ auth }) => auth.token)
  try {
    const response = yield call(getAppWebhook, {
      headers: { Authorization: `Bearer ${token}` },
      appID,
      webhookID,
    })
    if (response.ok) {
      yield put({ type: FETCH_APP_WEBHOOK_SUCCESS, webhook: response.data })
    } else throw new Error(feature.message)
  } catch (error) {
    yield put({ type: FETCH_APP_WEBHOOK_FAILURE, error: error.message })
  }
}
