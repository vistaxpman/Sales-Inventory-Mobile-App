import React, { Component } from 'react'
import { List, ListItem } from 'react-native-ui-kitten'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
  TouchableHighlight,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import CartItemsContainer from '../components/CartItemsContainer'
import Header from '../components/Header'

class Cart extends Component {
  constructor() {
    super()
  }

  renderItem = ({ item, index }) => <CartItemsContainer item={item} />

  render() {
    return (
      <View style={styles.listContainer}>
        {this.props.itemsInCart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcon name="remove-shopping-cart" size={80} color="gray" />
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
  return {}
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
    fontSize: 17,
    color: 'gray',
    marginTop: 10
  }
})
