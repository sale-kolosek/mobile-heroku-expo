import 'react-native-gesture-handler'

import { init as aptabaseInit } from '@aptabase/react-native'
import { LogBox } from 'react-native'
import { ThemeProvider } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import HerokuManager from './src'
import SplashScreen from './src/screens/SplashScreen'
import createStore from './src/store'
import { APTABASE_APP_KEY } from './src/util/env'

LogBox.ignoreLogs(['Require cycle'])

enableScreens()
aptabaseInit(APTABASE_APP_KEY)

const { store, persistor } = createStore()

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <PersistGate loading={<SplashScreen footer />} persistor={persistor}>
            <HerokuManager />
          </PersistGate>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  )
}
