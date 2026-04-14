import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    marginVertical: 50,
  },
  row: {
    height: 60,
    padding: 3,
    justifyContent: "center",
    backgroundColor: "white",
    paddingLeft: 30,
    flex: 1,
  },
  tileDetails: {
    marginHorizontal: 10,
  },
  text: {
    padding: 5,
    fontSize: 14,
    alignSelf: "center",
  },
  textTitle: {
    padding: 10,
    paddingBottom: 2,
    fontSize: 14,
    alignSelf: "center",
    fontWeight: "bold",
  },
  outterStyling: {
    backgroundColor: "#111111aa",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerStyling: {
    backgroundColor: "#ffffff",
    width: 300,
    margin: 30,
    padding: 30,
    borderRadius: 5,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#79589F",
    width: 80,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    width: 90,
    textAlign: "center",
  },
})
