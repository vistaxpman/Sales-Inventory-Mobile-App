import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from './Home'
import Sales from './Sales'
import Login from './Login'
import { AsyncStorage } from 'react-native'

goTo = 'Login'

getData = async () => {
  try {
    const value = await AsyncStorage.getItem('staffData')

    if (value !== null) {
      goTo = 'Home'
    }
  } catch (e) {
    console.error(e)
  }
}

getData()

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
        headerStyle: { backgroundColor: '#eeaf3b' },
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
    initialRouteName: 'Home'
  }
)

const AppNavigator = createAppContainer(NavigationStack)

export default AppNavigator
