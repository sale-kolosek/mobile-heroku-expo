import { StyleSheet } from "react-native"

export default StyleSheet.create({
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  dialogButton: {
    color: "white",
    width: 150,
    textAlign: "center",
    fontWeight: "900",
    fontSize: 13,
  },
  scrollViewContainer: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  optionsWrapper: {
    paddingLeft: 25,
    paddingRight: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorMessage: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
  },
})
