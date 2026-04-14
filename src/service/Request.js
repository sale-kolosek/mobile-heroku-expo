import { create } from "apisauce"
import { API_URL, INTERNAL_API_URL } from "../util/env"

export const request = create({
  baseURL: API_URL,
  headers: {
    Accept: `application/vnd.heroku+json; version=3`,
  },
  timeout: 5000,
})

export const internalApi = create({
  baseURL: INTERNAL_API_URL,
  headers: {
    Authorization: "Basic Y3VtdWx1czp0ZWxldml6b3I1NQ==",
  },
  timeout: 5000,
})
