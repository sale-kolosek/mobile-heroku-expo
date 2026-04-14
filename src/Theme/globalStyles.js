import { StyleSheet } from "react-native"

import Colors from "./Colors"
/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */

export default StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  error: {
    fontSize: 14,
    color: Colors.error,
    paddingHorizontal: 10,
    paddingBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 12,
    color: Colors.text,
  },
  button: {
    marginVertical: 20,
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    padding: 10,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  icon: {
    color: Colors.primary,
    fontSize: 25,
  },
  headerIcon: {
    fontSize: 24,
    color: "white",
  },
  outlineButton: {
    height: 50,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  underButton: {
    backgroundColor: "#B899E9",
    width: 120,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  currentRelease: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: "100%",
  },
  imageComponent: {
    maxHeight: 350,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredColumn: {
    flex: 1,
    alignItems: "center",
  },
  greyTextBig: {
    fontSize: 26,
    color: "#666",
  },
  greyText: {
    color: "#666",
  },
  tileDetails: {
    marginLeft: 5,
    justifyContent: "space-evenly",
    alignSelf: "stretch",
  },
  date: {
    color: "grey",
    fontSize: 10,
    paddingTop: 2,
  },
  iconGrey: {
    color: "#666666",
    flex: 1,
    fontSize: 22,
    textAlign: "center",
  },
  largeIconGrey: {
    color: "#666666",
    flex: 1,
    fontSize: 26,
    textAlign: "center",
  },

  itemTitle: {
    textAlign: "center",
    margin: 10,
    fontSize: 14,
  },
  itemInfo: {
    textAlign: "center",
    marginBottom: 20,
  },
})
