/* eslint-disable no-useless-catch */
import { request } from "./Request"

export const getTeams = async (options) => {
  try {
    const response = await request.get("/teams", null, options)
    if (response) return response
    return false
  } catch (error) {
    throw error
  }
}

export const getTeamMembers = async (options) => {
  try {
    const path = `/teams/${options.id}/members`
    const response = await request.get(path, null, options)
    if (response) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const patchTeamMembers = async (options) => {
  try {
    const path = `/teams/${options.id}/members`
    const response = await request.patch(path, { ...options.changedMember }, options)
    if (response) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const getTeamInfo = async (options) => {
  try {
    const path = `/teams/${options.id}/`
    const response = await request.get(path, null, options)
    if (response) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const patchTeamInfo = async (options) => {
  try {
    const path = `/teams/${options.id}/`
    const response = await request.patch(path, { ...options.teamInfo }, options)
    if (response) return response
    return false
  } catch (error) {
    throw error
  }
}
