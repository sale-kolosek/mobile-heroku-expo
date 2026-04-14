import { StyleSheet } from "react-native"

import { Colors } from "../../../Theme"

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
    color: Colors.primary,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  forgotPassLabel: {
    textAlign: "right",
    fontSize: 13,
    marginBottom: 10,
    marginRight: 10,
    color: Colors.primary,
  },
  backButton: {},
})
