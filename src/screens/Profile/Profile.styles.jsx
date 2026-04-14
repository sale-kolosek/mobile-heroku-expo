import { StyleSheet } from "react-native"

import { Colors } from "../../Theme"

export default StyleSheet.create({
  tileStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
  },
  dataStyle: {
    flex: 6,
  },
  labelStyle: {
    textAlign: "left",
    color: "#666",
    fontSize: 16,
  },
  textStyle: {
    textAlign: "left",
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  editButton: {
    flex: 1,
    position: "absolute",
    right: 10,
    backgroundColor: "transparent",
    height: 50,
    width: 50,
  },
  containerStyle: {
    height: 50,
    width: 50,
    backgroundColor: "transparent",
  },
})
