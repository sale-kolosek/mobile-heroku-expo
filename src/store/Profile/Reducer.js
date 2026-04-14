/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import { SIGN_OUT } from "../Auth"
import {
  FETCH_PROFILE,
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_SUCCESS,
  SAVE_PROFILE,
  SAVE_PROFILE_FAILURE,
  SAVE_PROFILE_SUCCESS,
} from "./index"

const initialState = {
  loading: false,
  profile: {},
  error: null,
}

const fetchProfile = (state) => ({
  ...state,
  loading: true,
  profile: null,
  error: null,
})
const fetchProfileSuccess = (state, { profile }) => ({
  ...state,
  loading: false,
  profile,
  error: null,
})
const fetchProfileFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
})
const saveProfile = (state) => ({
  ...state,
  loading: true,
})
const saveProfileSuccess = (state, { profile }) => ({
  ...state,
  loading: false,
  error: null,
  profile,
})
const saveProfileFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
})
const signOut = () => initialState

const ProfileReducer = createReducer(initialState, {
  [FETCH_PROFILE]: fetchProfile,
  [FETCH_PROFILE_SUCCESS]: fetchProfileSuccess,
  [FETCH_PROFILE_FAILURE]: fetchProfileFailure,
  [SAVE_PROFILE]: saveProfile,
  [SAVE_PROFILE_SUCCESS]: saveProfileSuccess,
  [SAVE_PROFILE_FAILURE]: saveProfileFailure,
  [SIGN_OUT]: signOut,
})

export default ProfileReducer
