import { StyleSheet } from "react-native"

import { Colors } from "../../../Theme"

export default StyleSheet.create({
  containerStyle: {
    position: "absolute",
    bottom: 30,
    right: 30,
    height: 50,
    width: 50,
    borderRadius: 25,
    elevation: 5,
  },
  buttonStyle: {
    height: 100,
    width: 100,
    flex: 1,
    backgroundColor: Colors.primary,
  },
  containerStyle2: {
    position: "absolute",
    bottom: 30,
    right: 100,
    height: 50,
    width: 50,
    borderRadius: 25,
    elevation: 5,
  },
  buttonStyle2: {
    height: 100,
    width: 100,
    flex: 1,
    backgroundColor: Colors.primary,
  },
  underButton: {
    backgroundColor: Colors.error,
    width: 70,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    flex: 1,
    marginLeft: 5,
    fontSize: 24,
    color: "white",
  },
})
