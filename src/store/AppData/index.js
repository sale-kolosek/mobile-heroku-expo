import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  fetchAppData: ["appID"],
  fetchAppDataSuccess: ["releases"],
  fetchAppDataFailure: ["error"],

  restartDyno: ["appID", "dynoID"],
  restartDynoSuccess: ["appID", "dynoID"],
  restartDynoFailure: ["appID", "dynoID", "error"],

  restartAllDynos: ["appID"],
  restartAllDynosSuccess: ["appID"],
  restartAllDynosFailure: ["appID", "error"],

  rollback: ["appID", "releaseID"],
  rollbackSuccess: ["release"],
  rollbackFailure: ["error"],

  fetchConfigVars: ["appID"],
  fetchConfigVarsSuccess: ["configVars"],
  fetchConfigVarsFailure: ["error"],

  saveConfigVars: ["configVars"],
  saveConfigVarsSuccess: ["configVars"],
  saveConfigVarsFailure: ["configVars"],

  fetchCollaborators: ["appID"],
  fetchCollaboratorsSuccess: ["collaborators"],
  fetchCollaboratorsFailure: ["error"],

  createCollaborator: ["appID", "userID"],
  createCollaboratorSuccess: ["status"],
  createCollaboratorFailure: ["error"],

  removeCollaborator: ["appID", "userID"],
  removeCollaboratorSuccess: ["userID"],
  removeCollaboratorFailure: ["error"],

  fetchAppFeatures: ["appID"],
  fetchAppFeaturesSuccess: ["features"],
  fetchAppFeaturesFailure: ["error"],

  toggleFeatureEnable: ["appID", "featureID", "enabled"],
  toggleFeatureEnableSuccess: ["appID", "featureID"],
  toggleFeatureEnableFailure: ["appID", "featureID", "error"],

  fetchDynos: ["appID"],
  fetchDynosSuccess: ["dynos"],
  fetchDynosFailure: ["error"],

  fetchDynosSize: null,
  fetchDynosSizeSuccess: ["dynosSize"],
  fetchDynosSizeFailure: ["error"],

  fetchAppFeature: ["appID", "featureID"],
  fetchAppFeatureSuccess: ["feature"],
  fetchAppFeatureFailure: ["error"],

  fetchAppWebhooks: ["appID"],
  fetchAppWebhooksSuccess: ["webhooks"],
  fetchAppWebhooksFailure: ["error"],

  deleteWebhook: ["appID", "webhookID"],
  deleteWebhookSuccess: ["webhookID"],
  deleteWebhookFailure: ["error"],

  fetchAppWebhook: ["appID", "webhookID"],
  fetchAppWebhookSuccess: ["webhook"],
  fetchAppWebhookFailure: ["error"],

  toggleHidden: null,
})

module.exports = { ...Types, ...Creators }
