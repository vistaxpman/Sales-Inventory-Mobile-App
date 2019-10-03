import React, { Component } from 'react'
import AppNavigator from './src/views/AppNavigator'

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
