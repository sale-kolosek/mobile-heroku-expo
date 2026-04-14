/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
import { request } from "./Request"

export const getAccount = async (options) => {
  try {
    const response = await request.get("/account", null, options)
    if (!response) throw new Error("Network error!")
    if (response.data && response.data.id === "forbidden") throw new Error("Token is invalid")
    return response.data
  } catch (error) {
    throw error
  }
}

export const signIn = async (options) => {
  try {
    const response = await request.post("/oauth/authorizations", null, options)
    if (!response) throw new Error("Network error!")
    if (response.data && response.data.id === "forbidden")
      throw new Error("Credentials are invalid!")
    return response.data
  } catch (error) {
    throw error
  }
}

export const signOut = async (options) => {
  try {
    const response = await request.delete(
      `/oauth/authorizations/${options.authorizationId}`,
      null,
      options,
    )
    if (!response) throw new Error("Network error!")
    if (response.data && response.data.id === "forbidden") throw new Error("Token is invalid")
    return response.data
  } catch (error) {
    throw error
  }
}

export const getAllDeviceAuthTokens = async (options) => {
  try {
    const response = await request.get(`/oauth/authorizations`, null, options)
    if (!response) throw new Error("Network error!")
    if (response.data && response.data.id === "forbidden") throw new Error("Token is invalid")
    return response.data
  } catch (error) {
    throw error
  }
}

export const resetPassword = async (options) => {
  try {
    const response = await request.post(`/password-resets`, options.data, options)
    if (!response) throw new Error("Network error!")
    if (response.data && response.data.id === "forbidden") throw new Error("Token is invalid")
    return response
  } catch (error) {
    throw error
  }
}
