import React, { Component } from 'react'
import { List, ListItem } from 'react-native-ui-kitten'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import CartItemsContainer from '../components/CartItemsContainer'
import { updateNoOfItemInCart } from '../store/actions/cartActions'

class Cart extends Component {
  constructor() {
    super()
  }

  updateNoOfItemInCart(transactionId, itemId, index, value, subIndex) {
    this.props.updateNoOfItemInCart(
      transactionId,
      itemId,
      index,
      value,
      subIndex
    )
  }

  renderItem = ({ item, index }) => (
    <CartItemsContainer
      item={item}
      onChange={(subItem, value, subIndex) => {
        this.updateNoOfItemInCart(
          item.transactionId,
          subItem.itemId,
          index,
          value,
          subIndex
        )
      }}
    />
  )

  render() {
    return (
      <View style={styles.listContainer}>
        {this.props.itemsInCart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcon name="remove-shopping-cart" size={50} color="gray" />
            <Text style={styles.emptyText}>
              Cart is empty. Place an order now
            </Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <List
              data={this.props.itemsInCart}
              renderItem={this.renderItem}
              style={styles.listLayout}
            />
          </ScrollView>
        )}
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    itemsInCart: state.cartReducer.itemsInCart
  }
}

mapDispatchToProps = dispatch => {
  return {
    updateNoOfItemInCart: (transactionId, itemId, index, value, subIndex) => {
      dispatch(
        updateNoOfItemInCart(transactionId, itemId, index, value, subIndex)
      )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    marginTop: 15
  },
  listLayout: {
    marginBottom: 30,
    backgroundColor: 'transparent'
  },
  emptyContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 15,
    color: 'gray',
    marginTop: 10
  }
})
