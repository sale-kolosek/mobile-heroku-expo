/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import {
  GET_ACCOUNT,
  GET_ACCOUNT_FAILURE,
  GET_ACCOUNT_SUCCESS,
  PREVIEW_APPS,
  PREVIEW_RELEASES,
  RESET_PASSWORD,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  SIGN_IN,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_OUT_FAILURE,
  SIGN_OUT_FROM_ALL_DEVICES,
  SIGN_OUT_FROM_ALL_DEVICES_FAILURE,
  SIGN_OUT_FROM_ALL_DEVICES_SUCCESS,
  SIGN_OUT_SUCCESS,
  UNLOCK_PREMIUM,
} from "./index"

const initialState = {
  loading: false,
  error: "",
  token: null,
  authorizationId: null,
  appsPreviewed: false,
  releasesPreviewed: false,
  data: null,
  premium: false,
}

const getAccount = (state, { apiKey }) => ({
  ...state,
  token: apiKey,
  loading: true,
  error: "",
})
const getAccountSuccess = (state, { data, premium, token }) => ({
  ...state,
  loading: false,
  error: "",
  data,
  premiumFeatures: premium || [],
  token,
})
const getAccountFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
})
const previewApps = (state) => ({
  ...state,
  appsPreviewed: true,
})
const previewReleases = (state) => ({
  ...state,
  releasesPreviewed: true,
})

const unlockPremium = (state) => ({
  ...state,
  premium: true,
})

const signIn = (state) => ({
  ...state,
  loading: true,
  error: "",
})

const signInSuccess = (state, { token, authorizationId }) => ({
  ...state,
  loading: false,
  error: "",
  token,
  authorizationId,
})

const signInFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
})

const signOut = (state) => ({
  ...state,
  token: null,
  authorizationId: null,
  loading: true,
  error: "",
})

const signOutSuccess = (state) => ({
  ...state,
  loading: false,
  id: null,
  token: null,
  authorizationId: null,
  data: null,
  premiumFeatures: [],
})

const signOutFailure = (state, { error }) => ({
  ...state,
  token: null,
  authorizationId: null,
  loading: false,
  error,
})

const signOutFromAllDevices = (state) => ({
  ...state,
  loading: true,
  error: "",
})

const signOutFromAllDevicesSuccess = (state) => ({
  ...state,
  loading: false,
  error: "",
})

const signOutFromAllDevicesFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
})

const resetPassword = (state) => ({
  ...state,
  loading: true,
  error: "",
})

const resetPasswordSuccess = (state) => ({
  ...state,
  loading: false,
  error: "",
})

const resetPasswordFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
})

const AccountReducer = createReducer(initialState, {
  [GET_ACCOUNT]: getAccount,
  [GET_ACCOUNT_SUCCESS]: getAccountSuccess,
  [GET_ACCOUNT_FAILURE]: getAccountFailure,
  [PREVIEW_APPS]: previewApps,
  [PREVIEW_RELEASES]: previewReleases,
  [SIGN_IN]: signIn,
  [SIGN_IN_SUCCESS]: signInSuccess,
  [SIGN_IN_FAILURE]: signInFailure,
  [SIGN_OUT]: signOut,
  [SIGN_OUT_SUCCESS]: signOutSuccess,
  [SIGN_OUT_FAILURE]: signOutFailure,
  [SIGN_OUT_FROM_ALL_DEVICES]: signOutFromAllDevices,
  [SIGN_OUT_FROM_ALL_DEVICES_SUCCESS]: signOutFromAllDevicesSuccess,
  [SIGN_OUT_FROM_ALL_DEVICES_FAILURE]: signOutFromAllDevicesFailure,
  [RESET_PASSWORD]: resetPassword,
  [RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [RESET_PASSWORD_FAILURE]: resetPasswordFailure,
  [UNLOCK_PREMIUM]: unlockPremium,
})

export default AccountReducer
