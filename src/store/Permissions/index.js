import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  fetchPermissions: ["permissions"],
  fetchPermissionsSuccess: ["permissions"],
  fetchPermissionsFailure: ["error"],
})

module.exports = { ...Types, ...Creators }
