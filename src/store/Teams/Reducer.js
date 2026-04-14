/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import {
  FETCH_TEAM_INFO,
  FETCH_TEAM_INFO_FAILURE,
  FETCH_TEAM_INFO_SUCCESS,
  FETCH_TEAM_MEMBERS,
  FETCH_TEAM_MEMBERS_FAILURE,
  FETCH_TEAM_MEMBERS_SUCCESS,
  FETCH_TEAMS,
  FETCH_TEAMS_FAILURE,
  FETCH_TEAMS_SUCCESS,
  SAVE_TEAM_INFO,
  SAVE_TEAM_INFO_FAILURE,
  SAVE_TEAM_INFO_SUCCESS,
  UPDATE_TEAM_MEMBERS,
  UPDATE_TEAM_MEMBERS_FAILURE,
  UPDATE_TEAM_MEMBERS_SUCCESS,
} from "./index"

const initialState = {
  loading: false,
  teams: [],
  teamInfo: [],
  teamMembers: [],
  changedMember: {},
  error: null,
}

const fetchTeams = (state) => ({
  ...state,
  loading: true,
  teams: [],
  error: null,
})
const fetchTeamsSuccess = (state, { teams }) => ({
  ...state,
  loading: false,
  teams,
  error: null,
})
const fetchTeamsFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
  teams: null,
})
const fetchTeamInfo = (state) => ({
  ...state,
  loading: true,
  teamInfo: [],
  error: null,
})
const fetchTeamInfoSuccess = (state, { teamInfo }) => ({
  ...state,
  loading: false,
  teamInfo,
  error: null,
})
const fetchTeamInfoFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
  teamInfo: null,
})
const saveTeamInfo = (state) => ({
  ...state,
  loading: true,
  teamInfo: [],
  error: null,
})
const saveTeamInfoSuccess = (state, { teamInfo }) => ({
  ...state,
  loading: false,
  teamInfo,
  error: null,
})
const saveTeamInfoFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
  teamInfo: null,
})
const fetchTeamMembers = (state) => ({
  ...state,
  loading: true,
  teamMembers: [],
  error: null,
})
const fetchTeamMembersSuccess = (state, { teamMembers }) => ({
  ...state,
  loading: false,
  teamMembers,
  error: null,
})
const fetchTeamMembersFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
  teamMembers: null,
})

const updateTeamMembers = (state) => ({
  ...state,
  loading: true,
  changedMember: {},
  error: null,
})
const updateTeamMembersSuccess = (state, { changedMember }) => ({
  ...state,
  loading: false,
  changedMember,
  error: null,
})
const updateTeamMembersFailure = (state, { error }) => ({
  ...state,
  loading: false,
  error,
  changedMember: null,
})

const TeamsReducer = createReducer(initialState, {
  [FETCH_TEAMS]: fetchTeams,
  [FETCH_TEAMS_SUCCESS]: fetchTeamsSuccess,
  [FETCH_TEAMS_FAILURE]: fetchTeamsFailure,
  [FETCH_TEAM_INFO]: fetchTeamInfo,
  [FETCH_TEAM_INFO_SUCCESS]: fetchTeamInfoSuccess,
  [FETCH_TEAM_INFO_FAILURE]: fetchTeamInfoFailure,
  [SAVE_TEAM_INFO]: saveTeamInfo,
  [SAVE_TEAM_INFO_SUCCESS]: saveTeamInfoSuccess,
  [SAVE_TEAM_INFO_FAILURE]: saveTeamInfoFailure,
  [FETCH_TEAM_MEMBERS]: fetchTeamMembers,
  [FETCH_TEAM_MEMBERS_SUCCESS]: fetchTeamMembersSuccess,
  [FETCH_TEAM_MEMBERS_FAILURE]: fetchTeamMembersFailure,
  [UPDATE_TEAM_MEMBERS]: updateTeamMembers,
  [UPDATE_TEAM_MEMBERS_SUCCESS]: updateTeamMembersSuccess,
  [UPDATE_TEAM_MEMBERS_FAILURE]: updateTeamMembersFailure,
})

export default TeamsReducer
