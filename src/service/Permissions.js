/* eslint-disable no-useless-catch */
/* eslint-disable import/prefer-default-export */
import { request } from "./Request"

export const getPermissions = async (options) => {
  try {
    const path = `/teams/${options.teamID}/permissions`
    const response = await request.get(path, null, options)
    if (response) return response.data
    return false
  } catch (error) {
    throw error
  }
}
