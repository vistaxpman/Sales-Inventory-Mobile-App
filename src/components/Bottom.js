import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid
} from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { SimpleHtml } from '@shoutem/ui'
import { connect } from 'react-redux'
import { toggleAreYouSureModalVisibility } from '../store/actions/homeActions'

const nairaIcon = `<span style="color: #fff">&#8358;<span>`
class Bottom extends Component {
  constructor() {
    super()
  }

  setModalVisible = () => {
    this.props.setModalVisible(!this.props.areYouSureModalIsVisible)
    // console.log(this.props.barCart)
  }

  render() {
    return (
      <View style={styles.bottomContainer}>
        <View style={styles.noOfItemsContainer}>
          <Text style={styles.noOfItemsTextOne}>
            {Number(this.props.totalNumberOfItemsAddedFromBar) +
              Number(this.props.totalNumberOfItemsAddedFromRestaurant)}
          </Text>
          <Text style={styles.noOfItemsTextTwo}>Item(s)</Text>
        </View>
        <View style={styles.totalAmountContainer}>
          <View>
            <Text style={styles.totalAmountTextOne}>Total Amount:</Text>
          </View>
          <View style={styles.totalIconAndAmountContainer}>
            {/* <SimpleHtml body={nairaIcon} style={styles.nairaIconContent} /> */}
            <Text style={{ color: '#fff', marginRight: 2 }}>#</Text>
            <Text style={styles.totalAmountTextTwo}>
              {Number(this.props.totalAmountOfItemsAddedFromBar) +
                Number(this.props.totalAmountOfItemsAddedFromRestaurant)}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.setModalVisible()}>
          <View style={styles.placeOrderContainer}>
            <FeatherIcon name="send" size={30} color="#fff" />
            <Text style={styles.placeOrderText}>Place Order</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    areYouSureModalIsVisible: state.homeReducer.areYouSureModalIsVisible,
    totalNumberOfItemsAddedFromBar:
      state.barReducer.totalNumberOfItemsAddedFromBar,
    totalAmountOfItemsAddedFromBar:
      state.barReducer.totalAmountOfItemsAddedFromBar,
    barCart: state.barReducer.barCart,
    totalNumberOfItemsAddedFromRestaurant:
      state.restaurantReducer.totalNumberOfItemsAddedFromRestaurant,
    totalAmountOfItemsAddedFromRestaurant:
      state.restaurantReducer.totalAmountOfItemsAddedFromRestaurant,
    restaurantCart: state.restaurantReducer.restaurantCart
  }
}

mapDispatchToProps = dispatch => {
  return {
    setModalVisible: status => {
      dispatch(toggleAreYouSureModalVisibility(status))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bottom)

const styles = StyleSheet.create({
  bottomContainer: {
    alignSelf: 'flex-end',
    height: 50,
    marginBottom: 7,
    backgroundColor: '#eeaf3b',
    borderColor: '#eeaf3b',
    borderWidth: 1,
    borderRadius: 3,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2
  },
  noOfItemsContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  noOfItemsTextOne: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
    textAlign: 'center'
  },
  noOfItemsTextTwo: {
    fontWeight: 'bold',
    color: '#fff'
  },
  totalAmountContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 7
  },
  totalIconAndAmountContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 0,
    margin: 0
  },
  nairaIconContent: {
    marginBottom: 10
  },
  totalAmountTextOne: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff'
  },
  totalAmountTextTwo: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  placeOrderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  placeOrderText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#fff'
  }
})
