import React, { Component } from 'react'
import { mapping, light as lightTheme } from '@eva-design/eva'
import { ApplicationProvider } from 'react-native-ui-kitten'
import AppNavigator from './src/views/AppNavigator'
import { StyleSheet } from 'react-native'

// const App = () => (
//   <ApplicationProvider mapping={mapping} theme={lightTheme}>
//     <AppNavigator />
//   </ApplicationProvider>
// )

export default class App extends Component {
  render() {
    return <AppNavigator />
  }
}
