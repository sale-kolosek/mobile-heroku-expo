import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import React from "react"
import { useSelector } from "react-redux"

import navigatorUtil from "../util/navigator-util"
import AuthStackNavigator from "./stacks/AuthStackNavigator"
import RootStackNavigator from "./stacks/RootStackNavigator"

const Stack = createStackNavigator()

export default function AppNavigator() {
  const [token] = useSelector(({ auth }) => [auth.token])
  return (
    <NavigationContainer ref={navigatorUtil.navigationRef}>
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          cardStyle: {
            opacity: 1,
          },
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName={token ? "Root" : "Auth"}
      >
        <Stack.Screen key="Auth" name="Auth" component={AuthStackNavigator} />
        <Stack.Screen key="Root" name="Root" component={RootStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
