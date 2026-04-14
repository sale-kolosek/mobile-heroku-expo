/* eslint-disable no-useless-catch */
import { request } from "./Request"

export const getProfile = async (options) => {
  try {
    const response = await request.get("/account", null, options)
    if (response.ok) return response
    return false
  } catch (error) {
    throw error
  }
}

export const patchProfile = async (options) => {
  try {
    const path = `/account`
    const response = await request.patch(path, { ...options.profile }, options)
    return response
  } catch (error) {
    throw error
  }
}
