import { DrawerActions, StackActions } from "@react-navigation/native"
import * as React from "react"

const navigationRef = React.createRef()

const navigate = (name, key, params) => {
  if (navigationRef.current) {
    navigationRef.current.navigate(name, key, params)
  }
}

const push = (name, params) => {
  if (navigationRef.current) {
    navigationRef.current.dispatch(StackActions.push(name, params))
  }
}

const pop = (name, params) => {
  if (navigationRef.current) {
    navigationRef.current.dispatch(StackActions.pop(name, params))
  }
}

const popToTop = () => {
  if (navigationRef.current) {
    navigationRef.current.dispatch(StackActions.popToTop())
  }
}

const replace = (name, params) => {
  if (navigationRef.current) {
    navigationRef.current.dispatch(StackActions.replace(name, params))
  }
}

const toggleDrawer = () => {
  if (navigationRef.current) {
    navigationRef.current.dispatch(DrawerActions.toggleDrawer())
  }
}

const openDrawer = () => {
  if (navigationRef.current) {
    navigationRef.current.dispatch(DrawerActions.openDrawer())
  }
}

const closeDrawer = () => {
  if (navigationRef.current) {
    navigationRef.current.dispatch(DrawerActions.closeDrawer())
  }
}

export default {
  navigationRef,
  navigate,
  push,
  pop,
  popToTop,
  replace,
  toggleDrawer,
  openDrawer,
  closeDrawer,
}
