import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import React from "react"

import AddCollaborator from "../../screens/AddCollaborator"
import App from "../../screens/App/AppData"
import AppSettings from "../../screens/App/AppSettings"
import CollaboratorScreen from "../../screens/App/Collaborator"
import Collaborators from "../../screens/App/Collaborators"
import Dynos from "../../screens/App/Dynos"
import DynoSizeInfoScreen from "../../screens/App/DynoSizeInfo"
import FeatureInfo from "../../screens/App/FeatureInfo"
import Features from "../../screens/App/Features"
import PremiumFeature from "../../screens/App/PremiumFeature"
import Trial from "../../screens/App/Trial"
import WebhookInfo from "../../screens/App/WebhookInfo"
import Webhooks from "../../screens/App/Webhooks"
import Applications from "../../screens/Applications"
import EnterpriseAccountScreen from "../../screens/Enterprise/EnterpriseAccount"
import EnterpriseInfoScreen from "../../screens/Enterprise/EnterpriseInfo"
import Invoices from "../../screens/Invoices"
import InvoicesAddressScreen from "../../screens/Invoices/InvoicesAddressScreen"
import InvoicesInfoScreen from "../../screens/Invoices/InvoicesInfoScreen"
import Permissions from "../../screens/Permissions"
import Profile from "../../screens/Profile"
import EditProfileName from "../../screens/Profile/EditProfileName"
import EditProfilePassword from "../../screens/Profile/EditProfilePassword"
import Settings from "../../screens/Settings"
import About from "../../screens/Settings/About"
import Contact from "../../screens/Settings/Contact"
import TeamsScreen from "../../screens/Teams"
import TeamInfoScreen from "../../screens/Teams/TeamInfo"
import TeamAccess from "../../screens/Teams/TeamInfo/TeamAccess"
import TeamMemberInfo from "../../screens/Teams/TeamInfo/TeamAccess/TeamMemberInfo"
import TeamApps from "../../screens/Teams/TeamInfo/TeamApps"

const RootStack = createStackNavigator()

const INITIAL_ROUTE_NAME = "MainScreen"
const routeMap = [
  { name: "MainScreen", component: Applications, gestureEnabled: false },
  { name: "Settings", component: Settings, gestureEnabled: true },
  { name: "App", component: App, gestureEnabled: false },
  { name: "About", component: About, gestureEnabled: true },
  { name: "Contact", component: Contact, gestureEnabled: true },
  { name: "AppSettings", component: AppSettings, gestureEnabled: true },
  { name: "PremiumFeature", component: PremiumFeature, gestureEnabled: true },
  { name: "Collaborators", component: Collaborators, gestureEnabled: true },
  { name: "CollaboratorScreen", component: CollaboratorScreen, gestureEnabled: true },
  { name: "AddCollaborator", component: AddCollaborator, gestureEnabled: true },
  { name: "Trial", component: Trial, gestureEnabled: true },
  { name: "Profile", component: Profile, gestureEnabled: true },
  { name: "EditProfileName", component: EditProfileName, gestureEnabled: true },
  { name: "EditProfilePassword", component: EditProfilePassword, gestureEnabled: true },
  { name: "Features", component: Features, gestureEnabled: true },
  { name: "Dynos", component: Dynos, gestureEnabled: true },
  { name: "DynoSizeInfoScreen", component: DynoSizeInfoScreen, gestureEnabled: true },
  { name: "Invoices", component: Invoices, gestureEnabled: true },
  { name: "InvoicesInfoScreen", component: InvoicesInfoScreen, gestureEnabled: true },
  { name: "InvoicesAddressScreen", component: InvoicesAddressScreen, gestureEnabled: true },
  { name: "EnterpriseAccountScreen", component: EnterpriseAccountScreen, gestureEnabled: true },
  { name: "EnterpriseInfoScreen", component: EnterpriseInfoScreen, gestureEnabled: true },
  { name: "Permissions", component: Permissions, gestureEnabled: true },
  { name: "TeamsScreen", component: TeamsScreen, gestureEnabled: true },
  { name: "TeamInfoScreen", component: TeamInfoScreen, gestureEnabled: true },
  { name: "FeatureInfo", component: FeatureInfo, gestureEnabled: true },
  { name: "Webhooks", component: Webhooks, gestureEnabled: true },
  { name: "WebhookInfo", component: WebhookInfo, gestureEnabled: true },
  { name: "TeamApps", component: TeamApps, gestureEnabled: true },
  { name: "TeamMemberInfo", component: TeamMemberInfo, gestureEnabled: true },
  { name: "TeamAccess", component: TeamAccess, gestureEnabled: true },
]

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        cardStyle: {
          opacity: 1,
        },
      }}
      initialRouteName={INITIAL_ROUTE_NAME}
    >
      {routeMap.map((selectedRoute) => (
        <RootStack.Screen
          key={selectedRoute.name}
          name={selectedRoute.name}
          component={selectedRoute.component}
          options={{ gestureEnabled: selectedRoute.gestureEnabled }}
        />
      ))}
    </RootStack.Navigator>
  )
}
