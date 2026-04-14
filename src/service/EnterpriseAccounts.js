/* eslint-disable no-useless-catch */
/* eslint-disable import/prefer-default-export */
import { request } from "./Request"

export const getEnterpriseAccounts = async (options) => {
  try {
    const response = await request.get("/enterprise-accounts", null, options)
    if (response) return response.data
    return false
  } catch (error) {
    throw error
  }
}
