import Constants from "expo-constants"

export default function useOTAVersion() {
  const appVersion = Constants.expoConfig?.version ?? "1.0.0"
  return { appVersion }
}
