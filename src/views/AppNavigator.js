import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from './Home'
import Orders from './Orders'

const NavigationStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Orders: {
      screen: Orders,
      navigationOptions: {
        title: 'Invex',
        headerTitleStyle: { color: '#fff' },
        headerStyle: { backgroundColor: '#eeaf3b' },
        headerTintColor: '#fff'
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
)

const AppNavigator = createAppContainer(NavigationStack)

export default AppNavigator
