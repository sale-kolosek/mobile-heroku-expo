import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  fetchEnterpriseAccounts: null,
  fetchEnterpriseAccountsSuccess: ["accounts"],
  fetchEnterpriseAccountsFailure: ["error"],
})

module.exports = { ...Types, ...Creators }
