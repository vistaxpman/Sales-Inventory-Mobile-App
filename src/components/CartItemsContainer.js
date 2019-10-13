import React, { Component } from 'react'
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
import { List, ListItem } from 'react-native-ui-kitten'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import CartItem from './CartItem'

class CartItemsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemsVisibility: true
    }
  }

  renderItem = ({ item, index }) => <CartItem item={item} />

  toggleItemsVisibility = () => {
    // this.setState({
    //   itemsVisibility: !this.state.itemsVisibility
    // })
  }

  render() {
    return (
      <View style={styles.cartItemsContainer}>
        <View style={styles.cartItemsContainerHeader}>
          <View>
            <Text style={styles.tIdBold}>Transaction Id:</Text>
            <Text style={styles.tIdNormal}>
              {this.props.item.transactionId}
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.toggleItemsVisibility}>
            <AntDesignIcon name="downcircleo" size={20} color="#c98811" />
          </TouchableOpacity>
        </View>

        <List
          data={this.props.item.transactionDetails}
          renderItem={this.renderItem}
          style={styles.listLayout}
        />

        <View style={styles.bottomContainer}>
          <TouchableOpacity>
            <View
              style={[
                {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: 15
                },
                styles.orderControlButtons
              ]}
            >
              <Text style={{ color: '#c98811', fontWeight: 'bold' }}>
                Cancel
              </Text>
              <Text style={{ color: '#c98811', fontWeight: 'bold' }}>
                Order
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={[
                {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                },
                styles.orderControlButtons
              ]}
            >
              <Text style={{ color: '#c98811', fontWeight: 'bold' }}>Edit</Text>
              <Text style={{ color: '#c98811', fontWeight: 'bold' }}>
                Order
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={[
                {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: 15
                },
                styles.orderControlButtons
              ]}
            >
              <Text style={{ color: '#c98811', fontWeight: 'bold' }}>Save</Text>
              <Text style={{ color: '#c98811', fontWeight: 'bold' }}>
                Changes
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {}
}

mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItemsContainer)

const styles = StyleSheet.create({
  cartItemsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    marginBottom: 30,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
    borderRadius: 3,
    backgroundColor: '#fff'
  },
  cartItemsContainerHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingBottom: 10
  },
  tIdBold: {
    fontWeight: 'bold',
    color: 'gray'
  },
  tIdNormal: {
    color: 'gray'
  },
  listLayout: {
    marginBottom: 30,
    backgroundColor: 'transparent'
  },
  bottomContainer: {
    alignSelf: 'flex-end',
    height: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5
  },
  orderControlButtons: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 3,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5
  }
})
