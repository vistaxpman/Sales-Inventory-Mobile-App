import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { Text, StyleSheet, AsyncStorage } from 'react-native'
import { Header as NativeHeader } from 'react-native-elements'
import { connect } from 'react-redux'
import SearchBar from './SearchBar'
import { filterItemsInBar } from '../store/actions/barActions'
import { filterItemsInRestaurant } from '../store/actions/restaurantActions'
import { filterTransactionsInCart } from '../store/actions/cartActions'
import PopupMenu from './PopupMenu'
import { clearItemsInBar } from '../store/actions/barActions'
import { clearItemsInRestaurant } from '../store/actions/restaurantActions'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screen: this.props.screen
    }
  }

  onPopupEvent = (eventName, index) => {
    // if (index === 0) {
    //   this.props.navigation.navigate('Sales')
    // }
    if (index === 0) {
      this.props.navigation.navigate('Profile')
    } else if (index === 1) {
      this.props.clearCart()
      ;(async () => {
        await AsyncStorage.setItem('staffData', '').then(value =>
          this.props.navigation.navigate('Login')
        )
      })()
    }
  }

  render() {
    Invex = () => <Text style={styles.invexText}>Invex</Text>

    return (
      <NativeHeader
        leftComponent={<Invex />}
        centerComponent={
          <SearchBar
            currentTab={this.props.currentTab}
            onChangeText={userInput => {
              this.props.filterItems(userInput, this.props.currentTab)
            }}
          />
        }
        rightComponent={
          <PopupMenu
            actions={['Profile', 'LogOut']}
            onPress={this.onPopupEvent}
          />
        }
        containerStyle={{
          backgroundColor: '#c98811',
          justifyContent: 'space-around'
        }}
      />
    )
  }
}

mapStateToProps = state => {
  return {
    currentTab: state.homeReducer.currentTab
  }
}

mapDispatchToProps = dispatch => {
  return {
    filterItems: (value, currentTab) => {
      if (currentTab === 'bar') {
        dispatch(filterItemsInBar(value))
      } else if (currentTab === 'restaurant') {
        dispatch(filterItemsInRestaurant(value))
      } else {
        dispatch(filterTransactionsInCart(value))
      }
    },
    clearCart: () => {
      dispatch(clearItemsInBar())
      dispatch(clearItemsInRestaurant())
    }
  }
}

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
)

const styles = StyleSheet.create({
  invexText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  }
})
