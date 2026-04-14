/* eslint-disable no-useless-catch */
import { request } from "./Request"

export const getInvoices = async (options) => {
  try {
    const response = await request.get("/account/invoices", null, options)
    if (response) return response.data
    return false
  } catch (error) {
    throw error
  }
}

export const getInvoiceAddress = async (options) => {
  try {
    const response = await request.get("/account/invoice-address", null, options)
    if (response) return response.data
    return false
  } catch (error) {
    throw error
  }
}

export const putInvoiceAddress = async (options) => {
  try {
    const path = "/account/invoice-address"
    const response = await request.put(path, { ...options.address }, options)
    if (response) return response.data
    return false
  } catch (error) {
    throw error
  }
}
