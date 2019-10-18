import React, { Component } from 'react'
import { YellowBox, AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import AppNavigator from './src/views/AppNavigator'
import { mapping, light as lightTheme } from '@eva-design/eva'
import { ApplicationProvider } from 'react-native-ui-kitten'
import store from './src/store'
import { socketIO } from './src/services/socketIO'

export default class App extends Component {
  constructor() {
    super()
    console.disableYellowBox = true
    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
    ])
  }

  componentDidMount() {
    socketIO(store)
  }

  render() {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </ApplicationProvider>
    )
  }
}
