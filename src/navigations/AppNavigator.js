import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../views/Home'
import Sales from '../views/Sales'
import RemovedItems from '../views/RemovedItems'
import Login from '../views/Login'
import SplashScreen from '../views/SplashScreen'
import Profile from '../views/Profile'

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
        title: 'Sales History',
        headerTitleStyle: { color: '#fff' },
        headerStyle: { backgroundColor: '#c98811' },
        headerTintColor: '#fff'
      }
    },
    RemovedItems: {
      screen: RemovedItems,
      navigationOptions: {
        title: 'Removed Items',
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
        title: 'Profile',
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


const AppNavigator = createAppContainer(NavigationStack)

export default AppNavigator
