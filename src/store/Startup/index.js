import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  // This action is triggered when the application starts
  startup: null,
  startupSuccess: null,

  setInternetConnection: null,
  setInternetConnectionSuccess: ["internetConnected"],
})

module.exports = { ...Creators, ...Types }
