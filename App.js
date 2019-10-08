import React, { Component } from 'react'
import { Provider } from 'react-redux'
import AppNavigator from './src/views/AppNavigator'
import { mapping, light as lightTheme } from '@eva-design/eva'
import { ApplicationProvider } from 'react-native-ui-kitten'
import store from './src/store'

// const App = () => (
//   <ApplicationProvider mapping={mapping} theme={lightTheme}>
//     <AppNavigator />
//   </ApplicationProvider>
// )

export default class App extends Component {
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
