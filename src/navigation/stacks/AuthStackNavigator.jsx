import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';

import Access from '../../screens/Auth/Access';
import ApiKey from '../../screens/Auth/ApiKey';
import ResetPassword from '../../screens/Auth/ResetPassword';
import SignIn from '../../screens/Auth/SignIn';

const AuthStack = createStackNavigator();

const INITIAL_ROUTE_NAME = 'Access';
const routeMap = [
  {name: 'Access', component: Access},
  {name: 'SignIn', component: SignIn},
  {name: 'ResetPassword', component: ResetPassword},
  {name: 'ApiKey', component: ApiKey},
];

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        cardStyle: {
          opacity: 1,
        },
      }}
      initialRouteName={INITIAL_ROUTE_NAME}>
      {routeMap.map(selectedRoute => (
        <AuthStack.Screen
          key={selectedRoute.name}
          name={selectedRoute.name}
          component={selectedRoute.component}
        />
      ))}
    </AuthStack.Navigator>
  );
}
