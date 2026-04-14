/* eslint-disable import/named */
import { all, takeLatest } from "redux-saga/effects"

import {
  CREATE_COLLABORATOR,
  DELETE_WEBHOOK,
  FETCH_APP_DATA,
  FETCH_APP_FEATURE,
  FETCH_APP_FEATURES,
  FETCH_APP_WEBHOOK,
  FETCH_APP_WEBHOOKS,
  FETCH_COLLABORATORS,
  FETCH_CONFIG_VARS,
  FETCH_DYNOS,
  FETCH_DYNOS_SIZE,
  REMOVE_COLLABORATOR,
  RESTART_ALL_DYNOS,
  ROLLBACK,
  SAVE_CONFIG_VARS,
  TOGGLE_FEATURE_ENABLE,
} from "../store/AppData"
import { FETCH_APPS, FETCH_APPS_BY_CRITERIA } from "../store/Apps"
import {
  GET_ACCOUNT,
  RESET_PASSWORD,
  SIGN_IN,
  SIGN_OUT,
  SIGN_OUT_FROM_ALL_DEVICES,
  UNLOCK_PREMIUM,
} from "../store/Auth"
import { FETCH_ENTERPRISE_ACCOUNTS } from "../store/Enterprise"
import { FETCH_INVOICE_ADDRESS, FETCH_INVOICES, SAVE_INVOICE_ADDRESS } from "../store/Invoices"
import { FETCH_PERMISSIONS } from "../store/Permissions"
import { FETCH_PROFILE, SAVE_PROFILE } from "../store/Profile"
import { SET_INTERNET_CONNECTION, STARTUP } from "../store/Startup"
import {
  FETCH_TEAM_INFO,
  FETCH_TEAM_MEMBERS,
  FETCH_TEAMS,
  SAVE_TEAM_INFO,
  UPDATE_TEAM_MEMBERS,
} from "../store/Teams"
import {
  createCollaborator,
  fetchAppData,
  fetchAppFeature,
  fetchAppFeatures,
  fetchAppWebhook,
  fetchAppWebhooks,
  fetchCollaborators,
  fetchConfigVars,
  fetchDynos,
  fetchDynosSize,
  removeCollaborator,
  removeWebhook,
  restartAllDynos,
  rollback,
  saveConfigVars,
  toggleFeatureEnabled,
} from "./AppDataSaga"
import { fetchApps, fetchAppsByCriteria } from "./AppsSaga"
import {
  getAccount,
  resetPassword,
  signIn,
  signOut,
  signOutFromAllDevices,
  // unlockPremium,
} from "./AuthSaga"
import { fetchEnterpriseAccounts } from "./EnterpriseAccountsSaga"
import { fetchInvoiceAddress, fetchInvoices, saveInvoiceAddress } from "./InvoicesSaga"
import { fetchPermissions } from "./PermissionsSaga"
import { fetchProfile, saveProfile } from "./ProfileSaga"
import { setInternetConnection, startup } from "./StartupSaga"
import {
  fetchTeamInfo,
  fetchTeamMembers,
  fetchTeams,
  saveTeamInfo,
  updateTeamMembers,
} from "./TeamsSaga"

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    takeLatest(SET_INTERNET_CONNECTION, setInternetConnection),
    takeLatest(STARTUP, startup),
    takeLatest(GET_ACCOUNT, getAccount),
    takeLatest(FETCH_APPS, fetchApps),
    takeLatest(FETCH_INVOICES, fetchInvoices),
    takeLatest(FETCH_INVOICE_ADDRESS, fetchInvoiceAddress),
    takeLatest(SAVE_INVOICE_ADDRESS, saveInvoiceAddress),
    takeLatest(FETCH_APPS_BY_CRITERIA, fetchAppsByCriteria),
    takeLatest(FETCH_APP_DATA, fetchAppData),
    takeLatest(RESTART_ALL_DYNOS, restartAllDynos),
    takeLatest(ROLLBACK, rollback),
    // takeLatest(UNLOCK_PREMIUM, unlockPremium),
    takeLatest(FETCH_CONFIG_VARS, fetchConfigVars),
    takeLatest(SAVE_CONFIG_VARS, saveConfigVars),
    takeLatest(SIGN_IN, signIn),
    takeLatest(SIGN_OUT, signOut),
    takeLatest(SIGN_OUT_FROM_ALL_DEVICES, signOutFromAllDevices),
    takeLatest(RESET_PASSWORD, resetPassword),
    takeLatest(FETCH_COLLABORATORS, fetchCollaborators),
    takeLatest(CREATE_COLLABORATOR, createCollaborator),
    takeLatest(REMOVE_COLLABORATOR, removeCollaborator),
    takeLatest(FETCH_PROFILE, fetchProfile),
    takeLatest(SAVE_PROFILE, saveProfile),
    takeLatest(FETCH_APP_FEATURES, fetchAppFeatures),
    takeLatest(FETCH_DYNOS, fetchDynos),
    takeLatest(FETCH_DYNOS_SIZE, fetchDynosSize),
    takeLatest(TOGGLE_FEATURE_ENABLE, toggleFeatureEnabled),
    takeLatest(FETCH_ENTERPRISE_ACCOUNTS, fetchEnterpriseAccounts),
    takeLatest(FETCH_TEAMS, fetchTeams),
    takeLatest(FETCH_PERMISSIONS, fetchPermissions),
    takeLatest(FETCH_TEAM_INFO, fetchTeamInfo),
    takeLatest(SAVE_TEAM_INFO, saveTeamInfo),
    takeLatest(FETCH_APP_FEATURE, fetchAppFeature),
    takeLatest(FETCH_APP_WEBHOOKS, fetchAppWebhooks),
    takeLatest(DELETE_WEBHOOK, removeWebhook),
    takeLatest(FETCH_APP_WEBHOOK, fetchAppWebhook),
    takeLatest(FETCH_TEAM_MEMBERS, fetchTeamMembers),
    takeLatest(UPDATE_TEAM_MEMBERS, updateTeamMembers),
  ])
}
