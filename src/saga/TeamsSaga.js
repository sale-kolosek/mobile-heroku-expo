/* eslint-disable import/named */
import { call, put, select } from "redux-saga/effects"

import {
  getTeamInfo,
  getTeamMembers,
  getTeams,
  patchTeamInfo,
  patchTeamMembers,
} from "../service/Teams"
import {
  FETCH_TEAM_INFO_FAILURE,
  FETCH_TEAM_INFO_SUCCESS,
  FETCH_TEAM_MEMBERS_FAILURE,
  FETCH_TEAM_MEMBERS_SUCCESS,
  FETCH_TEAMS,
  FETCH_TEAMS_FAILURE,
  FETCH_TEAMS_SUCCESS,
  SAVE_TEAM_INFO_FAILURE,
  SAVE_TEAM_INFO_SUCCESS,
  UPDATE_TEAM_MEMBERS_FAILURE,
  UPDATE_TEAM_MEMBERS_SUCCESS,
} from "../store/Teams"

export function* fetchTeams() {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getTeams, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response) throw new Error("Network error!")

    if (response && response.id && response.id === "unauthorized")
      throw new Error("Token is invalid")

    yield put({ type: FETCH_TEAMS_SUCCESS, teams: response.data })
  } catch (error) {
    yield put({ type: FETCH_TEAMS_FAILURE, error: error.message })
    throw error
  }
}
export function* fetchTeamMembers({ teamMembers }) {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getTeamMembers, {
      headers: { Authorization: `Bearer ${token}` },
      id: teamMembers.id,
    })
    yield put({ type: FETCH_TEAM_MEMBERS_SUCCESS, teamMembers: response.data })
  } catch (error) {
    yield put({ type: FETCH_TEAM_MEMBERS_FAILURE, error: error.message })
  }
}

export function* updateTeamMembers({ changedMember }) {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(patchTeamMembers, {
      headers: { Authorization: `Bearer ${token}` },
      id: changedMember.id,
      changedMember: changedMember.changedMember,
    })
    yield put({ type: UPDATE_TEAM_MEMBERS_SUCCESS, changedMember: response.data })
  } catch (error) {
    yield put({ type: UPDATE_TEAM_MEMBERS_FAILURE, error: error.message })
  }
}

export function* fetchTeamInfo({ teamInfo }) {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(getTeamInfo, {
      headers: { Authorization: `Bearer ${token}` },
      id: teamInfo.id,
    })
    yield put({ type: FETCH_TEAM_INFO_SUCCESS, teamInfo: response.data })
  } catch (error) {
    yield put({ type: FETCH_TEAM_INFO_FAILURE, error: error.message })
  }
}

export function* saveTeamInfo({ teamInfo }) {
  try {
    const token = yield select(({ auth }) => auth.token)
    const response = yield call(patchTeamInfo, {
      headers: { Authorization: `Bearer ${token}` },
      id: teamInfo.id,
      teamInfo: teamInfo.teamInfo,
    })
    yield put({ type: SAVE_TEAM_INFO_SUCCESS, teamInfo: response.data })
    yield put({ type: FETCH_TEAMS })
  } catch (error) {
    yield put({ type: SAVE_TEAM_INFO_FAILURE, error: error.message })
  }
}
