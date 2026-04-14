import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  fetchProfile: null,
  fetchProfileSuccess: ["profile"],
  fetchProfileFailure: ["error"],

  saveProfile: ["profile"],
  saveProfileSuccess: ["profile"],
  saveProfileFailure: ["error"],
})

module.exports = { ...Types, ...Creators }
