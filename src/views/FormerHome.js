import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Dimensions,
  ToastAndroid,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { Overlay } from 'react-native-elements'
import RBSheet from 'react-native-raw-bottom-sheet'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Spinner } from 'react-native-ui-kitten'
import Header from '../components/Header'
import Bottom from '../components/Bottom'
import {
  toggleAreYouSureModalVisibility,
  toggleCheckOutBottomSheet,
  changeTab
} from '../store/actions/homeActions'
import { clearItemsInBar } from '../store/actions/barActions'
import { clearItemsInRestaurant } from '../store/actions/restaurantActions'
import { addNewDataToCart } from '../store/actions/cartActions'
import { setStaffData } from '../store/actions/homeActions'
import Bar from './Bar'
import Restaurant from './Restaurant'
import Cart from './Cart'
import CheckOut from './CheckOut'
import { TextInput } from 'react-native-gesture-handler'
import { socket } from '../services/socketIO'

barRoute = () => {
  return <Bar />
}

restaurantRoute = () => {
  return <Restaurant />
}

cartRoute = () => {
  return <Cart />
}

class Home extends Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      routes: [
        { key: 'bar', title: 'Bar' },
        { key: 'restaurant', title: 'Restaurant' },
        { key: 'cart', title: 'Cart' }
      ],
      tableNumber: '',
      customerName: '',
      processingOrder: false
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    try {
      const staffData = await AsyncStorage.getItem('staffData')
      const Staff_ID = JSON.parse(staffData).Staff_ID
      socket.emit('getOngoingTransactions', Staff_ID, response => {
        console.log(response)
      })
      this.props.setStaffData(JSON.parse(staffData))
    } catch (e) {
      console.error(e)
    }
  }

  itemsInCheckOut = () => {
    return [...this.props.barCheckOut, ...this.props.restaurantCheckOut]
  }

  placeOrder = () => {
    if (socket.connected) {
      this.setState({
        processingOrder: true
      })
      const dataToSend = {
        barCheckOut: this.props.barCheckOut,
        restaurantCheckOut: this.props.restaurantCheckOut,
        totalNumberOfItemsAddedFromBar: this.props
          .totalNumberOfItemsAddedFromBar,
        totalNumberOfItemsAddedFromRestaurant: this.props
          .totalNumberOfItemsAddedFromRestaurant,
        totalAmountOfItemsAddedFromBar: this.props
          .totalAmountOfItemsAddedFromBar,
        totalAmountOfItemsAddedFromRestaurant: this.props
          .totalAmountOfItemsAddedFromRestaurant,
        tableNumber: this.state.tableNumber ? this.state.tableNumber : 'None',
        customerName: this.state.customerName
          ? this.state.customerName
          : 'Walk-In',
        staffData: this.props.staffData,
        transactionId: new Date().valueOf(),
        date: new Date(),
        Staff_ID: this.props.staffData.Staff_ID
      }
      console.log(dataToSend)
      // socket.emit('newOrder', dataToSend, response => {
      //   if (response.message === 'Order Received') {
      //     const aTransaction = {}
      //     aTransaction.transactionId = dataToSend.transactionId
      //     aTransaction.tableNumber = dataToSend.tableNumber
      //     aTransaction.transactionTotalAmount =
      //       Number(dataToSend.totalAmountOfItemsAddedFromBar) +
      //       Number(dataToSend.totalAmountOfItemsAddedFromRestaurant)
      //     aTransaction.transactionTotalNumberOfItems =
      //       Number(dataToSend.totalNumberOfItemsAddedFromBar) +
      //       Number(dataToSend.totalNumberOfItemsAddedFromRestaurant)
      //     aTransaction.updatedTransactionTotalAmount = 0
      //     aTransaction.updatedTransactionTotalNumberOfItems = 0
      //     aTransaction.transactionDetails = [
      //       ...dataToSend.barCheckOut,
      //       ...dataToSend.restaurantCheckOut
      //     ]
      //     aTransaction.transactionDetails.map(item => {
      //       item.noInCart = item.noInCheckOut
      //       delete item.noInCheckOut
      //       return item
      //     })
      //     this.props.addNewDataToCart(aTransaction)
      //   }
      //   this.props.setModalVisible()
      //   this.setState({
      //     processingOrder: false
      //   })
      //   this.props.clearCart()
      // })
    }
  }

  viewOrder = () => {
    this.showCheckOutModal()
    this.props.setModalVisible()
  }

  openClearModal = () => {
    return Alert.alert(
      'Delete Items to Order',
      'Are you sure you want to delete all items ?',
      [
        {
          text: 'Cancel',
          onPress: () => null
        },
        {},
        {
          text: 'OK',
          onPress: () => {
            this.hideCheckOutModal()
            this.props.clearCart()
          }
        }
      ],
      { cancelable: true }
    )
  }

  showConfirmationDialog = () => {
    const totalAmount =
      Number(this.props.totalAmountOfItemsAddedFromBar) +
      Number(this.props.totalAmountOfItemsAddedFromRestaurant)
    if (this.props.areYouSureModalIsVisible && totalAmount <= 0) {
      ToastAndroid.show(
        'Please, select items before you order.',
        ToastAndroid.SHORT
      )
      this.props.setModalVisible()
    } else {
      if (this.props.areYouSureModalIsVisible) {
        return (
          <Overlay
            isVisible={true}
            windowBackgroundColor="rgba(0, 0, 0, .5)"
            overlayBackgroundColor="#fff"
            width="90%"
            height="auto"
            onBackdropPress={() => {
              if (!this.state.processingOrder) {
                this.props.setModalVisible()
                this.setState({
                  processingOrder: false
                })
              }
            }}
          >
            {this.state.processingOrder ? (
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  paddingTop: 5,
                  paddingBottom: 20,
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 30,
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  Sending your Order...
                </Text>
                <Spinner size="giant" status="info" />
              </View>
            ) : (
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 10
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    textAlign: 'center'
                  }}
                >
                  Confirm Order
                </Text>
                <Text style={{ fontSize: 15, marginBottom: 40 }}>
                  Are you sure you want to place this order ?
                </Text>
                <TextInput
                  placeholder="Table Number"
                  style={styles.textInputStyle}
                  onChangeText={tableNumber =>
                    this.setState({
                      tableNumber: tableNumber
                    })
                  }
                />
                <TextInput
                  placeholder="Customer Name(Optional)"
                  style={styles.textInputStyle}
                  onChangeText={customerName =>
                    this.setState({
                      customerName: customerName
                    })
                  }
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 25
                  }}
                >
                  <TouchableWithoutFeedback onPress={() => this.viewOrder()}>
                    <Text
                      style={[
                        styles.bottomControls2,
                        {
                          borderColor: '#c98811',
                          borderWidth: 1
                        }
                      ]}
                    >
                      View
                    </Text>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.placeOrder()}>
                    <Text
                      style={[
                        styles.bottomControls,
                        { backgroundColor: '#c98811' }
                      ]}
                    >
                      Send
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            )}
          </Overlay>
        )
      } else {
        return null
      }
    }
  }

  showCheckOutModal = () => {
    this.RBSheet.open()
  }

  hideCheckOutModal = () => {
    this.RBSheet.close()
  }

  setModalVisible = () => {
    this.props.setModalVisible(!this.props.areYouSureModalIsVisible)
  }

  toggleActiveTab = index => {
    this.setState({ index })
    let tab = ''
    index === 0 ? (tab = 'bar') : index === 1 ? (tab = 'restaurant') : ''
    this.props.toggleActiveTab(tab)
  }

  renderIcon = ({ route, focused, color }) => {
    return route.key === 'bar' ? (
      <View>
        {focused && (
          <FontAwesome5Icon name="wine-bottle" size={15} color="#eeaf3b" />
        )}
        {!focused && (
          <FontAwesome5Icon name="wine-bottle" size={15} color="#ccc" />
        )}
      </View>
    ) : route.key === 'restaurant' ? (
      <View>
        {focused && (
          <MaterialCommunityIcon
            name="food-variant"
            size={15}
            color="#eeaf3b"
          />
        )}
        {!focused && (
          <MaterialCommunityIcon name="food-variant" size={15} color="#ccc" />
        )}
      </View>
    ) : route.key === 'cart' ? (
      <View>
        {focused && (
          <MaterialCommunityIcon name="cart" size={15} color="#eeaf3b" />
        )}
        {!focused && (
          <MaterialCommunityIcon name="cart" size={15} color="#ccc" />
        )}
      </View>
    ) : null
  }

  toggleCheckOutBottomSheet = () => {
    this.props.toggleCheckOutBottomSheet(!this.props.checkBottomSheetIsVisible)
  }

  renderLabel = ({ route, focused, color }) => {
    return (
      <View>
        <Text
          style={[
            styles.tabText,
            focused ? styles.activeTabTextColor : styles.tabTextColor
          ]}
        >
          {route.title}
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.showConfirmationDialog()}
        <RBSheet
          ref={ref => {
            this.RBSheet = ref
          }}
          height={400}
          duration={150}
          customStyles={{}}
        >
          <View style={styles.bottomSheetContainer}>
            <View style={styles.bottomSheetHeader}>
              <TouchableOpacity
                onPress={() => {
                  this.hideCheckOutModal()
                  this.setModalVisible()
                }}
              >
                <FeatherIcon name="send" size={25} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.bottomSheetHeaderText}>Items to Order</Text>
              {this.itemsInCheckOut().length > 0 && (
                <TouchableOpacity onPress={() => this.openClearModal()}>
                  <MaterialCommunityIcon
                    name="delete"
                    size={25}
                    color="#fff"
                    style={{ marginLeft: 'auto' }}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => this.hideCheckOutModal()}>
                <AntDesignIcon
                  style={{ marginLeft: 25 }}
                  name="close"
                  size={25}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <CheckOut />
          </View>
        </RBSheet>
        <Header screen="bar" />
        <View style={styles.layoutContainer}>
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              bar: barRoute,
              restaurant: restaurantRoute,
              cart: cartRoute
            })}
            onIndexChange={index => this.toggleActiveTab(index)}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: '#eeaf3b' }}
                style={{ backgroundColor: '#303030', height: 55 }}
                renderIcon={this.renderIcon}
                indicatorStyle={{ backgroundColor: '#eeaf3b', height: 5 }}
                renderLabel={this.renderLabel}
              />
            )}
          />
          <Bottom
            onBottomSheetStateChange={() => {
              this.showCheckOutModal()
            }}
          />
        </View>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    currentTab: state.homeReducer.currentTab,
    areYouSureModalIsVisible: state.homeReducer.areYouSureModalIsVisible,
    checkBottomSheetIsVisible: state.homeReducer.checkBottomSheetIsVisible,
    barCheckOut: state.barReducer.barCheckOut,
    restaurantCheckOut: state.restaurantReducer.restaurantCheckOut,
    totalNumberOfItemsAddedFromBar:
      state.barReducer.totalNumberOfItemsAddedFromBar,
    totalNumberOfItemsAddedFromRestaurant:
      state.restaurantReducer.totalNumberOfItemsAddedFromRestaurant,
    totalAmountOfItemsAddedFromBar:
      state.barReducer.totalAmountOfItemsAddedFromBar,
    totalAmountOfItemsAddedFromRestaurant:
      state.restaurantReducer.totalAmountOfItemsAddedFromRestaurant,
    staffData: state.homeReducer.staffData
  }
}

mapDispatchToProps = dispatch => {
  return {
    setModalVisible: status => {
      dispatch(toggleAreYouSureModalVisibility(status))
    },
    toggleActiveTab: tab => {
      dispatch(changeTab(tab))
    },
    toggleCheckOutBottomSheet: status => {
      dispatch(toggleCheckOutBottomSheet(status))
    },
    clearCart: () => {
      dispatch(clearItemsInBar())
      dispatch(clearItemsInRestaurant())
    },
    addNewDataToCart: aTransaction => {
      dispatch(addNewDataToCart(aTransaction))
    },
    setStaffData: staffData => {
      dispatch(setStaffData(staffData))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    backgroundColor: '#eee'
  },
  tabContainer: {
    backgroundColor: '#fff'
  },
  activeTabTextColor: {
    color: '#eeaf3b'
  },
  tabTextColor: {
    color: '#ccc'
  },
  tabText: {
    fontWeight: 'bold'
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    height: '70%',
    alignSelf: 'flex-end'
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row'
  },
  bottomSheetContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  bottomSheetHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#c98811'
  },
  bottomSheetHeaderText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold'
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    marginBottom: 25,
    padding: 7,
    borderRadius: 3
  },
  bottomControls: {
    fontSize: 17,
    color: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 3,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2
  },
  bottomControls2: {
    fontSize: 17,
    color: '#c98811',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 3,
    shadowColor: '#c98811',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2
  }
})