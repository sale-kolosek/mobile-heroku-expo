/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import { FETCH_PERMISSIONS, FETCH_PERMISSIONS_FAILURE, FETCH_PERMISSIONS_SUCCESS } from "./index"

const initialState = {
  loading: false,
  permissions: [],
  error: null,
}

const fetchPermissions = (state) => ({
  ...state,
  loading: true,
  permissions: [],
  error: null,
})
const fetchPermissionsSuccess = (state, { permissions }) => ({
  ...state,
  loading: false,
  permissions,
  error: null,
})
const fetchPermissionsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
  permissions: initialState.permissions,
})

const PermissionsReducer = createReducer(initialState, {
  [FETCH_PERMISSIONS]: fetchPermissions,
  [FETCH_PERMISSIONS_SUCCESS]: fetchPermissionsSuccess,
  [FETCH_PERMISSIONS_FAILURE]: fetchPermissionsFailure,
})

export default PermissionsReducer
