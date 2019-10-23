import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../views/Home'
import Sales from '../views/Sales'
import Login from '../views/Login'
import SplashScreen from '../views/SplashScreen'
import Profile from '../views/Profile'
// import InvexLogo from '../assets/invex.png'

// Invex = () => <Image source={InvexLogo} style={styles.invexImage} />

const NavigationStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Sales: {
      screen: Sales,
      navigationOptions: {
        // headerLeft: <Invex />,
        title: 'Invex',
        headerTitleStyle: { color: '#fff' },
        headerStyle: { backgroundColor: '#c98811' },
        headerTintColor: '#fff'
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        header: null
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Staff Profile',
        headerTitleStyle: { color: '#fff' },
        headerStyle: { backgroundColor: '#c98811' },
        headerTintColor: '#fff'
      }
    }
  },
  {
    initialRouteName: 'SplashScreen'
  }
)

const styles = StyleSheet.create({
  invexImage: {
    height: 40,
    width: 70,
    marginRight: 10
  }
})

const AppNavigator = createAppContainer(NavigationStack)

export default AppNavigator
