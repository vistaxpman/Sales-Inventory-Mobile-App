import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from './Home'
import Cart from './Cart'

const NavigationStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        header: null
        // title: 'Invex',
        // headerTitleStyle: { color: '#fff' },
        // headerStyle: { backgroundColor: '#eeaf3b' },
        // headerTintColor: '#fff'
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
)

const AppNavigator = createAppContainer(NavigationStack)

export default AppNavigator
