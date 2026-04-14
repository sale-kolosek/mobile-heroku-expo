/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import { SIGN_OUT } from "../Auth"
import {
  FETCH_APPS,
  FETCH_APPS_BY_CRITERIA,
  FETCH_APPS_BY_CRITERIA_FAILURE,
  FETCH_APPS_BY_CRITERIA_SUCCESS,
  FETCH_APPS_FAILURE,
  FETCH_APPS_SUCCESS,
} from "./index"

const initialState = { loading: false, apps: [], error: null }

const fetchApps = (state) => ({ ...state, loading: true, error: null })
const fetchAppsSuccess = (state, { apps }) => ({ ...state, loading: false, apps, error: null })
const fetchAppsFailure = (state, { error }) => ({ ...state, loading: false, error, apps: [] })
const fetchAppsByCriteria = (state) => ({ ...state, loading: true, error: null })
const fetchAppsByCriteriaSuccess = (state, { apps }) => ({
  ...state,
  loading: false,
  apps,
  error: null,
})
const fetchAppsByCriteriaFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
  apps: [],
})
const signOut = () => initialState

const AppsReducer = createReducer(initialState, {
  [FETCH_APPS]: fetchApps,
  [FETCH_APPS_SUCCESS]: fetchAppsSuccess,
  [FETCH_APPS_FAILURE]: fetchAppsFailure,
  [FETCH_APPS_BY_CRITERIA]: fetchAppsByCriteria,
  [FETCH_APPS_BY_CRITERIA_SUCCESS]: fetchAppsByCriteriaSuccess,
  [FETCH_APPS_BY_CRITERIA_FAILURE]: fetchAppsByCriteriaFailure,
  [SIGN_OUT]: signOut,
})

export default AppsReducer
