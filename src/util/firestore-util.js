// Firebase/Firestore stub for Expo managed workflow.
// TODO: Add @react-native-firebase/app and @react-native-firebase/firestore via EAS Build
// and replace this stub with the real implementation from mobile-heroku/src/util/firestore-util.js

export const getAllUsersFS = async () => {
  console.warn("[Firestore] getAllUsersFS — Firebase not configured yet")
}

export const addNewUserFS = (id, info) => {
  console.warn("[Firestore] addNewUserFS — Firebase not configured yet", id, info)
}

export const updateUserFS = (id, info) => {
  console.warn("[Firestore] updateUserFS — Firebase not configured yet", id, info)
}

export const getUserFS = async (id) => {
  console.warn("[Firestore] getUserFS — Firebase not configured yet", id)
  return { exists: false, data: null }
}
