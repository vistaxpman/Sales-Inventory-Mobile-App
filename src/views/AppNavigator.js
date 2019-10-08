import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Bar from './Bar'
import Restaurant from './Restaurant'
import Cart from './Cart'

const NavigationStack = createStackNavigator(
  {
    Bar: {
      screen: Bar,
      navigationOptions: {
        header: null
      }
    },
    Restaurant: {
      screen: Restaurant,
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
    initialRouteName: 'Bar'
  }
)

const AppNavigator = createAppContainer(NavigationStack)

export default AppNavigator
