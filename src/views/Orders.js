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

class Orders extends Component {
  constructor() {
    super()
  }

  renderItem = ({ item, index }) => <CartItemsContainer item={item} />

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.layoutContainer}>
          <Text style={styles.layoutTitleText}>Orders</Text>
          <View style={styles.listContainer}>
            {this.props.itemsInCart.length === 0 ? (
              <View style={styles.emptyContainer}>
                <MaterialIcon
                  name="remove-shopping-cart"
                  size={80}
                  color="gray"
                />
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
        </View>
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
)(Orders)

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    marginTop: 5,
    backgroundColor: '#F5FCFF',
    paddingLeft: 5,
    paddingRight: 5
  },
  layoutTitleText: {
    fontSize: 17,
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 10
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
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
