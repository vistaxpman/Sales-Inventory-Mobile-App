import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { AsyncStorage } from 'react-native'
import Home from './Home'
import Sales from './Sales'
import Login from './Login'

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
    }
  },
  {
    initialRouteName: AsyncStorage.getItem('staffData') ? 'Home' : 'Login'
  }
)

const AppNavigator = createAppContainer(NavigationStack)

export default AppNavigator
