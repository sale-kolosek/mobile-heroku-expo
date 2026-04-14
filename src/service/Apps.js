/* eslint-disable no-useless-catch */
import { request } from "./Request"

export const getApps = async (options) => {
  try {
    const response = await request.get("/apps", null, options)
    if (response) return response.data
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const getAppsByCriteria = async (options) => {
  try {
    const path = `/filters/apps/`
    const response = await request.post(path, options.postData, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const getAppData = async (options) => {
  try {
    const path = `/apps/${options.appID}/releases`
    const response = await request.get(path, null, options)
    if (response.ok) return response.data
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const restartAllDynos = async (options) => {
  try {
    const path = `/apps/${options.appID}/dynos`
    const response = await request.delete(path, null, options)
    if (response.ok) {
      return response
    }
    return response
  } catch (error) {
    throw error
  }
}

export const restartDyno = async (options) => {
  try {
    const path = `/apps/${options.appID}/dynos/${options.dynoID}`
    const response = await request.delete(path, null, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const rollback = async (options) => {
  try {
    const path = `/apps/${options.appID}/releases`
    const response = await request.post(path, { release: options.releaseID }, options)
    if (response.ok) return response
    if (response.data?.message) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const getConfigVars = async (options) => {
  try {
    const path = `/apps/${options.appID}/config-vars`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const patchConfigVars = async (options) => {
  try {
    const path = `/apps/${options.appID}/config-vars`
    const response = await request.patch(path, { ...options.configVars }, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const getCollaborators = async (options) => {
  try {
    const path = `/apps/${options.appID}/collaborators`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const inviteCollaborator = async (options) => {
  try {
    const path = `/apps/${options.appID}/collaborators`
    const response = await request.post(path, { user: options.userID, silent: false }, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const deleteCollaborator = async (options) => {
  try {
    const path = `/apps/${options.appID}/collaborators/${options.userID}`
    const response = await request.delete(path, null, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const getAppFeatures = async (options) => {
  try {
    const path = `/apps/${options.appID}/features`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const toggleFeatureEnable = async (options) => {
  try {
    const path = `/apps/${options.appID}/features/${options.featureID}`
    const response = await request.patch(path, { ...options.enabled }, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const getDynos = async (options) => {
  try {
    const path = `/apps/${options.appID}/dynos`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const getDynosSize = async (options) => {
  try {
    const path = `/dyno-sizes/`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const getAppFeature = async (options) => {
  try {
    const path = `/apps/${options.appID}/features/${options.featureID}`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const getAppWebhooks = async (options) => {
  try {
    const path = `/apps/${options.appID}/webhooks`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const deleteWebhook = async (options) => {
  try {
    const path = `/apps/${options.appID}/webhooks/${options.webhookID}`
    const response = await request.delete(path, null, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}

export const getAppWebhook = async (options) => {
  try {
    const path = `/apps/${options.appID}/webhooks/${options.webhookID}`
    const response = await request.get(path, null, options)
    if (response.ok) return response
    throw new Error("Network Error!")
  } catch (error) {
    throw error
  }
}
