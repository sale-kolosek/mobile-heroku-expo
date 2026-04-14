/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import { SIGN_OUT } from "../Auth"
import {
  CREATE_COLLABORATOR,
  CREATE_COLLABORATOR_FAILURE,
  CREATE_COLLABORATOR_SUCCESS,
  DELETE_WEBHOOK,
  DELETE_WEBHOOK_FAILURE,
  DELETE_WEBHOOK_SUCCESS,
  FETCH_APP_DATA,
  FETCH_APP_DATA_FAILURE,
  FETCH_APP_DATA_SUCCESS,
  FETCH_APP_FEATURE,
  FETCH_APP_FEATURE_FAILURE,
  FETCH_APP_FEATURE_SUCCESS,
  FETCH_APP_FEATURES,
  FETCH_APP_FEATURES_FAILURE,
  FETCH_APP_FEATURES_SUCCESS,
  FETCH_APP_WEBHOOK,
  FETCH_APP_WEBHOOK_FAILURE,
  FETCH_APP_WEBHOOK_SUCCESS,
  FETCH_APP_WEBHOOKS,
  FETCH_APP_WEBHOOKS_FAILURE,
  FETCH_APP_WEBHOOKS_SUCCESS,
  FETCH_COLLABORATORS,
  FETCH_COLLABORATORS_FAILURE,
  FETCH_COLLABORATORS_SUCCESS,
  FETCH_CONFIG_VARS,
  FETCH_CONFIG_VARS_FAILURE,
  FETCH_CONFIG_VARS_SUCCESS,
  FETCH_DYNOS,
  FETCH_DYNOS_FAILURE,
  FETCH_DYNOS_SIZE,
  FETCH_DYNOS_SIZE_FAILURE,
  FETCH_DYNOS_SIZE_SUCCESS,
  FETCH_DYNOS_SUCCESS,
  REMOVE_COLLABORATOR,
  REMOVE_COLLABORATOR_FAILURE,
  REMOVE_COLLABORATOR_SUCCESS,
  // RESTART_DYNO,
  // RESTART_DYNO_SUCCESS,
  // RESTART_DYNO_FAILURE,
  RESTART_ALL_DYNOS,
  RESTART_ALL_DYNOS_FAILURE,
  RESTART_ALL_DYNOS_SUCCESS,
  ROLLBACK,
  ROLLBACK_FAILURE,
  ROLLBACK_SUCCESS,
  SAVE_CONFIG_VARS,
  SAVE_CONFIG_VARS_FAILURE,
  SAVE_CONFIG_VARS_SUCCESS,
  TOGGLE_FEATURE_ENABLE,
  TOGGLE_FEATURE_ENABLE_FAILURE,
  TOGGLE_FEATURE_ENABLE_SUCCESS,
  TOGGLE_HIDDEN,
} from "./index"

const initialState = {
  loading: false,
  error: null,
  releases: [],
  data: {},
  restarted: false,
  rolledback: false,
  configVars: [],
  configVarsLoading: false,
  configVarsHidden: true,
  features: [],
  featuresLoading: false,
  featureEnableToggled: false,
  dynos: [],
  dynosSize: [],
  feature: null,
  featureLoading: false,
  webhooks: [],
  webhooksLoading: false,
  webhook: null,
  webhookLoading: false,
}

const fetchAppData = (state) => ({
  ...state,
  releases: [],
  loading: true,
  error: null,
})
const fetchAppDataSuccess = (state, { releases, data }) => ({
  ...state,
  loading: false,
  error: null,
  // dynos: appData.map(dyno => ({ ...dyno, loading: false, restarted: false, error: null })),
  releases,
  data,
})
const fetchAppDataFailure = (state, { error }) => ({
  ...initialState,
  error,
})
// const restartDyno = (state, { dynoID }) => ({
//   ...state,
//   dynos: state.dynos.map(dyno =>
//     dynoID === dyno.id ? { ...dyno, loading: true, restarted: false, error: null } : dyno,
//   ),
// })
// const restartDynoSuccess = (state, { dynoID }) => ({
//   ...state,
//   dynos: state.dynos.map(dyno =>
//     dynoID === dyno.id ? { ...dyno, loading: false, restarted: true, error: null } : dyno,
//   ),
// })
// const restartDynoFailure = (state, { dynoID, error }) => ({
//   ...state,
//   dynos: state.dynos.map(dyno =>
//     dynoID === dyno.id ? { ...dyno, loading: false, restarted: false, error } : dyno,
//   ),
// })[1]
const restartAllDynos = (state, { appID }) => ({
  ...state,
  restarted: null,
})
const restartAllDynosSuccess = (state) => ({
  ...state,
  restarted: true,
})
const restartAllDynosFailure = (state, { error }) => ({
  ...state,
  restarted: false,
})
const rollback = (state) => ({
  ...state,
  rolledback: null,
  error: "",
})
const rollbackSuccess = (state, { release }) => ({
  ...state,
  rolledback: true,
  error: "",
  releases: [release, ...state.releases.map((release) => ({ ...release, current: false }))],
})
const rollbackFailure = (state, { error }) => ({
  ...state,
  rolledback: false,
  error,
})
const fetchConfigVars = (state) => ({
  ...state,
  configVars: [],
  configVarsLoading: true,
})
const fetchConfigVarsSuccess = (state, { configVars }) => ({
  ...state,
  configVarsLoading: false,
  configVars,
})
const fetchConfigVarsFailure = (state, { error }) => ({
  ...state,
  configVarsLoading: false,
  configVars: [],
  error,
})
const saveConfigVars = (state) => ({
  ...state,
  configVarsLoading: true,
})
const saveConfigVarsSuccess = (state, { configVars }) => ({
  ...state,
  configVarsLoading: false,
  configVars,
})
const saveConfigVarsFailure = (state, { error }) => ({
  ...state,
  configVarsLoading: false,
  error,
})
const fetchCollaborators = (state) => ({
  ...state,
  collaborators: [],
  collaboratorsLoading: true,
})
const fetchCollaboratorsSuccess = (state, { collaborators }) => ({
  ...state,
  collaboratorsLoading: false,
  collaborators,
})
const fetchCollaboratorsFailure = (state, { error }) => ({
  ...state,
  collaboratorsLoading: false,
  error,
})
const createCollaborator = (state) => ({
  ...state,
})
const createCollaboratorSuccess = (state, { user }) => ({
  ...state,
  collaborators: [user, ...state.collaborators],
})
const createCollaboratorFailure = (state, { error }) => ({
  ...state,
  error,
})
const removeCollaborator = (state) => ({
  ...state,
})
const removeCollaboratorSuccess = (state, { userID }) => ({
  ...state,
  collaborators: state.collaborators.filter((collaborator) => collaborator.id !== userID),
})
const removeCollaboratorFailure = (state, { error }) => ({
  ...state,
  error,
})
const fetchAppFeatures = (state) => ({
  ...state,
  error: null,
  featuresLoading: true,
})
const fetchAppFeaturesSuccess = (state, { features }) => ({
  ...state,
  featuresLoading: false,
  error: null,
  features,
})
const fetchAppFeaturesFailure = (state, { error }) => ({
  ...state,
  featuresLoading: false,
  error,
})
const toggleFeatureEnable = (state, { featureId }) => ({
  ...state,
  featureEnableToggled: null,
  error: null,
})
const toggleFeatureEnableSuccess = (state, { feature }) => ({
  ...state,
  featureEnableToggled: true,
  error: null,
})
const toggleFeatureEnableFailure = (state, { error }) => ({
  ...state,
  featureEnableToggled: false,
  error,
})
const fetchAppFeature = (state) => ({
  ...state,
  error: null,
  featureLoading: true,
  feature: null,
})
const fetchAppFeatureSuccess = (state, { feature }) => ({
  ...state,
  featureLoading: false,
  error: null,
  feature,
})
const fetchAppFeatureFailure = (state, { error }) => ({
  ...state,
  featureLoading: false,
  feature: null,
  error,
})
const fetchAppWebhooks = (state) => ({
  ...state,
  error: null,
  webhooksLoading: true,
})
const fetchAppWebhooksSuccess = (state, { webhooks }) => ({
  ...state,
  webhooksLoading: false,
  error: null,
  webhooks,
})
const fetchAppWebhooksFailure = (state, { error }) => ({
  ...state,
  webhooksLoading: false,
  error,
})
const deleteWebhook = (state) => ({
  ...state,
})
const deleteWebhookSuccess = (state, { webhookID }) => ({
  ...state,
  webhooks: state.webhooks.filter((webhook) => webhook.id !== webhookID),
})
const deleteWebhookFailure = (state, { error }) => ({
  ...state,
  error,
})
const fetchAppWebhook = (state) => ({
  ...state,
  error: null,
  webhookLoading: true,
  webhook: null,
})
const fetchAppWebhookSuccess = (state, { webhook }) => ({
  ...state,
  webhookLoading: false,
  error: null,
  webhook,
})
const fetchAppWebhookFailure = (state, { error }) => ({
  ...state,
  webhookLoading: false,
  webhook: null,
  error,
})

const toggleHidden = (state) => ({
  ...state,
  configVarsHidden: !state.configVarsHidden,
})
const fetchDynos = (state) => ({
  ...state,
  error: null,
  dynosLoading: true,
})
const fetchDynosSuccess = (state, { dynos }) => ({
  ...state,
  dynosLoading: false,
  error: null,
  dynos,
})
const fetchDynosFailure = (state, { error }) => ({
  ...state,
  dynosLoading: false,
  error,
})
const fetchDynosSize = (state) => ({
  ...state,
  error: null,
  dynosSizeLoading: true,
})
const fetchDynosSizeSuccess = (state, { dynosSize }) => ({
  ...state,
  dynosSizeLoading: false,
  error: null,
  dynosSize,
})
const fetchDynosSizeFailure = (state, { error }) => ({
  ...state,
  dynosSizeLoading: false,
  error,
})
const signOut = () => initialState

const AppsReducer = createReducer(initialState, {
  [FETCH_APP_DATA]: fetchAppData,
  [FETCH_APP_DATA_SUCCESS]: fetchAppDataSuccess,
  [FETCH_APP_DATA_FAILURE]: fetchAppDataFailure,

  // [RESTART_DYNO]: restartDyno,
  // [RESTART_DYNO_SUCCESS]: restartDynoSuccess,
  // [RESTART_DYNO_FAILURE]: restartDynoFailure,

  [RESTART_ALL_DYNOS]: restartAllDynos,
  [RESTART_ALL_DYNOS_SUCCESS]: restartAllDynosSuccess,
  [RESTART_ALL_DYNOS_FAILURE]: restartAllDynosFailure,

  [ROLLBACK]: rollback,
  [ROLLBACK_SUCCESS]: rollbackSuccess,
  [ROLLBACK_FAILURE]: rollbackFailure,

  [FETCH_CONFIG_VARS]: fetchConfigVars,
  [FETCH_CONFIG_VARS_SUCCESS]: fetchConfigVarsSuccess,
  [FETCH_CONFIG_VARS_FAILURE]: fetchConfigVarsFailure,

  [SAVE_CONFIG_VARS]: saveConfigVars,
  [SAVE_CONFIG_VARS_SUCCESS]: saveConfigVarsSuccess,
  [SAVE_CONFIG_VARS_FAILURE]: saveConfigVarsFailure,

  [FETCH_COLLABORATORS]: fetchCollaborators,
  [FETCH_COLLABORATORS_SUCCESS]: fetchCollaboratorsSuccess,
  [FETCH_COLLABORATORS_FAILURE]: fetchCollaboratorsFailure,

  [CREATE_COLLABORATOR]: createCollaborator,
  [CREATE_COLLABORATOR_SUCCESS]: createCollaboratorSuccess,
  [CREATE_COLLABORATOR_FAILURE]: createCollaboratorFailure,

  [REMOVE_COLLABORATOR]: removeCollaborator,
  [REMOVE_COLLABORATOR_SUCCESS]: removeCollaboratorSuccess,
  [REMOVE_COLLABORATOR_FAILURE]: removeCollaboratorFailure,

  [FETCH_APP_FEATURES]: fetchAppFeatures,
  [FETCH_APP_FEATURES_SUCCESS]: fetchAppFeaturesSuccess,
  [FETCH_APP_FEATURES_FAILURE]: fetchAppFeaturesFailure,

  [TOGGLE_FEATURE_ENABLE]: toggleFeatureEnable,
  [TOGGLE_FEATURE_ENABLE_SUCCESS]: toggleFeatureEnableSuccess,
  [TOGGLE_FEATURE_ENABLE_FAILURE]: toggleFeatureEnableFailure,

  [FETCH_DYNOS]: fetchDynos,
  [FETCH_DYNOS_SUCCESS]: fetchDynosSuccess,
  [FETCH_DYNOS_FAILURE]: fetchDynosFailure,

  [FETCH_DYNOS_SIZE]: fetchDynosSize,
  [FETCH_DYNOS_SIZE_SUCCESS]: fetchDynosSizeSuccess,
  [FETCH_DYNOS_SIZE_FAILURE]: fetchDynosSizeFailure,

  [FETCH_APP_FEATURE]: fetchAppFeature,
  [FETCH_APP_FEATURE_SUCCESS]: fetchAppFeatureSuccess,
  [FETCH_APP_FEATURE_FAILURE]: fetchAppFeatureFailure,

  [FETCH_APP_WEBHOOKS]: fetchAppWebhooks,
  [FETCH_APP_WEBHOOKS_SUCCESS]: fetchAppWebhooksSuccess,
  [FETCH_APP_WEBHOOKS_FAILURE]: fetchAppWebhooksFailure,

  [DELETE_WEBHOOK]: deleteWebhook,
  [DELETE_WEBHOOK_SUCCESS]: deleteWebhookSuccess,
  [DELETE_WEBHOOK_FAILURE]: deleteWebhookFailure,

  [FETCH_APP_WEBHOOK]: fetchAppWebhook,
  [FETCH_APP_WEBHOOK_SUCCESS]: fetchAppWebhookSuccess,
  [FETCH_APP_WEBHOOK_FAILURE]: fetchAppWebhookFailure,

  [TOGGLE_HIDDEN]: toggleHidden,

  [SIGN_OUT]: signOut,
})

export default AppsReducer
