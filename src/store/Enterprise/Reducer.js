/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import {
  FETCH_ENTERPRISE_ACCOUNTS,
  FETCH_ENTERPRISE_ACCOUNTS_FAILURE,
  FETCH_ENTERPRISE_ACCOUNTS_SUCCESS,
} from "./index"

const initialState = {
  loading: false,
  accounts: [],
  error: null,
}

const fetchEnterpriseAccounts = (state) => ({
  ...state,
  loading: true,
  accounts: [],
  error: null,
})
const fetchEnterpriseAccountsSuccess = (state, { accounts }) => ({
  ...state,
  loading: false,
  accounts,
  error: null,
})
const fetchEnterpriseAccountsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
  accounts: null,
})

const EnterpriseReducer = createReducer(initialState, {
  [FETCH_ENTERPRISE_ACCOUNTS]: fetchEnterpriseAccounts,
  [FETCH_ENTERPRISE_ACCOUNTS_SUCCESS]: fetchEnterpriseAccountsSuccess,
  [FETCH_ENTERPRISE_ACCOUNTS_FAILURE]: fetchEnterpriseAccountsFailure,
})

export default EnterpriseReducer
