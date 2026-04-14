/* eslint-disable no-useless-catch */
import { internalApi } from "./Request"

export const postInfo = async (body) => {
  try {
    await internalApi.post("/infos", body)
  } catch (error) {
    throw error
  }
}

export const getPremium = async (body) => {
  try {
    const response = await internalApi.get("/features", body)
    return response.data.features
  } catch (error) {
    throw error
  }
}

export const postPremium = async (body) => {
  try {
    await internalApi.post("/features", body)
  } catch (error) {
    throw error
  }
}
