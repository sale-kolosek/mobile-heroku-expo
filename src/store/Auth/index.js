import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  getAccount: ["actionType", "apiKey"],
  getAccountSuccess: ["data"],
  getAccountFailure: ["error"],
  previewApps: null,
  previewReleases: null,
  signOut: ["token", "authorizationId"],
  signOutSuccess: null,
  signOutFailure: ["error"],
  signOutFromAllDevices: ["token", "authorizationId"],
  signOutFromAllDevicesSuccess: null,
  signOutFromAllDevicesFailure: ["error"],
  unlockPremium: null,
  signIn: ["details"],
  signInSuccess: ["token", "authorizationId"],
  signInFailure: ["error"],
  resetPassword: ["email"],
  resetPasswordSuccess: null,
  resetPasswordFailure: ["error"],
})

module.exports = { ...Types, ...Creators }
