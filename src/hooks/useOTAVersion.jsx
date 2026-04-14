import { useEffect, useState } from "react"
import * as Updates from "expo-updates"
import Constants from "expo-constants"

export default function useOTAVersion() {
  const version = Constants.expoConfig?.version ?? "1.0.0"
  const [appVersion, setAppVersion] = useState(version)

  useEffect(() => {
    if (Updates.updateId) {
      setAppVersion(`${version}/${Updates.updateId}`)
    }
  }, [])

  return { appVersion }
}
