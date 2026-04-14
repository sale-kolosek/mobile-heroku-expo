import Constants from "expo-constants"

const extra = Constants.expoConfig?.extra ?? {}

export const API_URL = extra.API_URL ?? "https://api.heroku.com"
export const INTERNAL_API_URL = extra.INTERNAL_API_URL ?? ""
export const AD_AUTH_URL = extra.AD_AUTH_URL ?? ""
export const AD_NOAUTH_URL = extra.AD_NOAUTH_URL ?? ""
export const APPCENTER_BRANCH = extra.APPCENTER_BRANCH ?? ""
export const APTABASE_APP_KEY = extra.APTABASE_APP_KEY ?? ""
