import { StyleSheet } from "react-native"

import { Colors } from "../../../Theme"

export default StyleSheet.create({
  underButtonDisable: {
    backgroundColor: Colors.error,
    width: 120,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  underButtonEnable: {
    backgroundColor: Colors.success,
    width: 120,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  hiddenBtnWrapper: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 2,
  },
})
