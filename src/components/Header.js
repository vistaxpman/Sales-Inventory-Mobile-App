import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Header as NativeHeader } from 'react-native-elements'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import { connect } from 'react-redux'
import SearchBar from './SearchBar'
import { filterItemsInBar } from '../store/actions/barActions'
import { filterItemsInRestaurant } from '../store/actions/restaurantActions'
import { filterTransactionsInCart } from '../store/actions/cartActions'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screen: this.props.screen
    }
  }

  handleCartIcon = () => {
    this.props.navigation.navigate('Sales')
  }

  render() {
    Invex = () => <Text style={styles.invexText}>Invex</Text>

    CartIcon = () => (
      <TouchableOpacity onPress={this.handleCartIcon}>
        <FoundationIcon name="burst-sale" size={35} color="#fff" />
      </TouchableOpacity>
    )

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
        rightComponent={<CartIcon />}
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
