/**
 * This import defaults to localStorage for web and AsyncStorage for react-native.
 *
 * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
 * (like API tokens, private and sensitive data, etc.).
 *
 * If you need to store sensitive information, use redux-persist-sensitive-storage.
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */
import AsyncStorage from "@react-native-async-storage/async-storage"
import { applyMiddleware, compose, createStore } from "redux"
import Logger from "redux-logger"
import { persistReducer, persistStore } from "redux-persist"
import createSagaMiddleware from "redux-saga"

import { filterObjectAgainstKeys } from "../util/data-util"

const whitelist = [
  "auth",
  "apps",
  "appData",
  "app",
  "profile",
  "invoices",
  "address",
  "accounts",
  "teams",
  "teamMembers",
  "changedMember",
  "permissions",
  "teamInfo",
]

const migrationState = (state) => {
  return {
    ...state,
    auth: { ...state.auth, premium: false, loading: false },
    apps: { ...state.apps, loading: false },
    appData: { ...state.appData, loading: false },
    app: { ...state.app, loading: false },
    profile: { ...state.profile, loading: false },
    invoices: {
      ...state.invoices,
      loading: false,
      invoices: { ...state.invoices.invoices, loading: false },
    },
    address: {
      ...state.address,
      loading: false,
      address: { ...state.address.address, loading: false },
    },
    accounts: { ...state.accounts, loading: false },
    teams: { ...state.teams, loading: false },
    teamMembers: { ...state.teamMembers, loading: false },
    changedMember: { ...state.changedMember, loading: false },
    permissions: { ...state.permissions, loading: false },
    teamInfo: { ...state.teamInfo, loading: false },
  }
}
const migrations = (state) => {
  const filteredWhiteListKeys = Object.keys(filterObjectAgainstKeys(state, whitelist))
  const filteredMigrationState = filterObjectAgainstKeys(
    migrationState(state),
    filteredWhiteListKeys,
  )
  // eslint-disable-next-line no-console
  console.log("Migration Running!", state, filteredMigrationState)
  return Promise.resolve(filteredMigrationState)
}

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  migrate: migrations,
  whitelist,
}

export default (rootReducer, rootSaga) => {
  const middleware = []
  const enhancers = []

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  if (process.env.NODE_ENV === "development") {
    middleware.push(Logger)
  }

  enhancers.push(applyMiddleware(...middleware))

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, compose(...enhancers))
  const persistor = persistStore(store)

  // Kick off the root saga
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
