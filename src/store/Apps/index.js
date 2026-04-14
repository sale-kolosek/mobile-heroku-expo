import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  fetchApps: null,
  fetchAppsByCriteria: ["criterium"],
  fetchAppsSuccess: ["apps"],
  fetchAppsFailure: ["error"],
  fetchAppsByCriteriaSuccess: ["apps"],
  fetchAppsByCriteriaFailure: ["error"],
})

module.exports = { ...Types, ...Creators }
