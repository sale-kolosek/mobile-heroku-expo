import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  fetchTeams: null,
  fetchTeamsSuccess: ["teams"],
  fetchTeamsFailure: ["error"],

  fetchTeamInfo: ["teamInfo"],
  fetchTeamInfoSuccess: ["teamInfo"],
  fetchTeamInfoFailure: ["error"],

  saveTeamInfo: ["teamInfo"],
  saveTeamInfoSuccess: ["teamInfo"],
  saveTeamInfoFailure: ["error"],

  fetchTeamMembers: ["teamMembers"],
  fetchTeamMembersSuccess: ["teamMembers"],
  fetchTeamMembersFailure: ["error"],

  updateTeamMembers: ["changedMember"],
  updateTeamMembersSuccess: ["changedMember"],
  updateTeamMembersFailure: ["error"],
})

module.exports = { ...Types, ...Creators }
