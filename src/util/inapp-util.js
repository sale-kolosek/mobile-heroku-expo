import { Alert, Platform } from "react-native"
import moment from "moment"
import { isEmpty } from "lodash"

import { getUserFS, updateUserFS } from "./firestore-util"

// TODO: Wire up react-native-iap (or expo-in-app-purchases) via EAS Build for production IAP

export const skus = Platform.select({
  ios: ["com.kolosek.herokumng.premium"],
  android: [],
})

export const isUserSubscriptionActive = async (id) => {
  try {
    const { exists, data } = await getUserFS(id)
    if (exists) {
      const lastPaymentItem = data.purchaseInfo
      if (!isEmpty(lastPaymentItem)) {
        return moment().isBefore(moment(lastPaymentItem?.transactionDate).add(1, "month"))
      }
    }
    return false
  } catch (error) {}

  return false
}

export const PurchasePremiumPlan = async ({ userID, onSuccess }) => {
  Alert.alert(
    "Premium",
    "In-app purchases require native setup via EAS Build. Configure your IAP provider before using this feature.",
  )
}
