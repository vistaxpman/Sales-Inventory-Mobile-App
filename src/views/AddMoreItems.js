import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ToastAndroid
} from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import TabBar from '@mindinventory/react-native-tab-bar-interaction'
import { List } from 'react-native-ui-kitten'
import { connect } from 'react-redux'
import SingleMoreItem from '../components/SingleMoreItem'
import {
  updateNoOfItemInMoreBar,
  updateNoOfItemInMoreRestaurant
} from '../store/actions/moreItemsToOrderActions'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import CartItem from '../components/CartItem'
import MoreItemsSearchBar from '../components/MoreItemsSearchBar'
import { socket } from '../services/socketIO'
import { addMoreToCart } from '../store/actions/cartActions'

class AddMoreItems extends Component {
  constructor(props) {
    super(props)
  }

  closeModal = () => {
    this.props.onCloseModal()
  }

  sendAddMoreItems = async () => {
    if (socket.connected) {
      const transactionId = this.props.selectedOrderTransactionId
      const barCheckOut = this.props.barCheckOut
      const restaurantCheckOut = this.props.restaurantCheckOut

      if (barCheckOut.length === 0 && restaurantCheckOut.length === 0) {
        //This line takes a while to run, hence the need to wait for it
        ToastAndroid.show(
          'Please, select items before you order.',
          ToastAndroid.SHORT
        )
      } else {
        await this.props.addMoreToCart(
          transactionId,
          barCheckOut,
          restaurantCheckOut
        )
        const data = this.props.selectedItem
        ToastAndroid.show('Order sent successfully.', ToastAndroid.SHORT)
        socket.emit('moreAdded', data, response => {
          this.closeModal()
        })
      }
    } else {
      ToastAndroid.show(
        'Please check your network connection.',
        ToastAndroid.SHORT
      )
    }
  }

  renderSingleMoreItemToBar = ({ item, index }) => (
    <SingleMoreItem
      item={item}
      index={index}
      onChange={(value, eventType) => {
        this.props.updateNoOfItemInMoreBar(value, index)
      }}
    />
  )

  renderSingleMoreItemToRestaurant = ({ item, index }) => (
    <SingleMoreItem
      item={item}
      index={index}
      onChange={(value, eventType) => {
        this.props.updateNoOfItemInMoreRestaurant(value, index)
      }}
    />
  )

  renderItemsToOrderCart = ({ item, index }) => <CartItem item={item} />

  itemsToOrder = () => {
    return [...this.props.barCheckOut, ...this.props.restaurantCheckOut]
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.bottomSheetHeader}>
            <TouchableOpacity
              onPress={() => {
                this.sendAddMoreItems()
              }}
            >
              <FeatherIcon name="send" size={25} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.bottomSheetHeaderText}>
              Add more Items to Order
            </Text>
            <TouchableOpacity onPress={() => this.closeModal()}>
              <AntDesignIcon
                style={{ marginLeft: 25 }}
                name="close"
                size={25}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <TabBar>
            <TabBar.Item
              icon={require('../assets/2325619-200.png')}
              selectedIcon={require('../assets/2325619-200.png')}
              title="Restaurant"
            >
              <View style={styles.gridContainer}>
                <View style={styles.searchContainer}>
                  <MoreItemsSearchBar tab='Restaurant' />
                </View>
                {this.props.restaurant.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <MaterialIcon
                      name="remove-shopping-cart"
                      size={50}
                      color="gray"
                    />
                    <Text style={styles.emptyText}>None Found.</Text>
                  </View>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <FlatList
                        data={this.props.restaurant}
                        keyExtractor={item => item.itemId}
                        renderItem={this.renderSingleMoreItemToRestaurant}
                        horizontal={false}
                        numColumns={2}
                        contentContainerStyle={styles.gridLayout}
                      />
                    </ScrollView>
                  )}
              </View>
            </TabBar.Item>
            <TabBar.Item
              icon={require('../assets/917640-200.png')}
              selectedIcon={require('../assets/917640-200.png')}
              title="Bar"
            >
              <View style={styles.gridContainer}>
                <View style={styles.searchContainer}>
                  <MoreItemsSearchBar tab='Bar' />
                </View>
                {this.props.bar.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <MaterialIcon
                      name="remove-shopping-cart"
                      size={50}
                      color="gray"
                    />
                    <Text style={styles.emptyText}>None Found.</Text>
                  </View>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <FlatList
                        data={this.props.bar}
                        keyExtractor={item => item.itemId}
                        renderItem={this.renderSingleMoreItemToBar}
                        horizontal={false}
                        numColumns={2}
                        contentContainerStyle={styles.gridLayout}
                      />
                    </ScrollView>
                  )}
              </View>
            </TabBar.Item>

            <TabBar.Item
              icon={require('../assets/1570216-200.png')}
              selectedIcon={require('../assets/1570216-200.png')}
              title="Cart"
            >
              <View style={styles.gridContainer}>
                {this.itemsToOrder().length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <MaterialIcon name="hourglass-empty" size={50} color="gray" />
                    <Text style={styles.emptyText}>None Found.</Text>
                  </View>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <List
                        data={this.itemsToOrder()}
                        renderItem={this.renderItemsToOrderCart}
                      />
                    </ScrollView>
                  )}
              </View>
            </TabBar.Item>
          </TabBar>
        </View>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    bar: state.moreItemsToOrderReducer.bar,
    restaurant: state.moreItemsToOrderReducer.restaurant,
    moreItemsToOrderTab: state.moreItemsToOrderReducer.moreItemsToOrderTab,
    barCheckOut: state.moreItemsToOrderReducer.barCheckOut,
    restaurantCheckOut: state.moreItemsToOrderReducer.restaurantCheckOut,
    selectedOrderTransactionId:
      state.moreItemsToOrderReducer.selectedOrderTransactionId,
    selectedItem: state.cartReducer.selectedItem
  }
}

mapDispatchToProps = dispatch => {
  return {
    updateNoOfItemInMoreBar: (value, index) => {
      dispatch(updateNoOfItemInMoreBar(value, index))
    },
    updateNoOfItemInMoreRestaurant: (value, index) => {
      dispatch(updateNoOfItemInMoreRestaurant(value, index))
    },
    addMoreToCart: (transactionId, barCheckOut, restaurantCheckOut) => {
      dispatch(addMoreToCart(transactionId, barCheckOut, restaurantCheckOut))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMoreItems)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column'
  },
  bottomSheetHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c98811',
    height: 50,
    padding: 10,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  bottomSheetHeaderText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold'
  },
  gridContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#eee',
    flexDirection: 'column'
  },
  gridLayout: {
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between'
  },
  emptyContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#c98811',
  }
})
