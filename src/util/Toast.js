import Toast from "react-native-root-toast"

import { Colors } from "../Theme"

const success = (message) =>
  Toast.show(message, {
    opacity: 1,
    backgroundColor: Colors.success,
    position: 80,
  })

const error = (message) =>
  Toast.show(message, {
    opacity: 1,
    backgroundColor: Colors.error,
    position: 80,
    duration: message.length < 60 ? 1500 : 3000,
  })

export default { success, error }
