import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import {
  addItemToBar,
  removeItemFromBar,
  editNoOfItemInBar
} from '../store/actions/barActions'
import {
  addItemToRestaurant,
  removeItemFromRestaurant,
  editNoOfItemInRestaurant
} from '../store/actions/restaurantActions'
import { increaseNoInCart } from '../store/actions/cartActions'

class GridItem extends Component {
  constructor(props) {
    super(props)
  }

  onChangeNoInCart = (userInput, item, index) => {
    this.props.onChangeNoInCart(userInput, item, index, this.props.currentTab)
    // this.setState({
    //   bar: update(this.state.bar, {
    //     3: { noInCart: { $set: `${noInCart}` } }
    //   })
    // })
  }

  increaseNumberOfItemsInCart = (item, index) => {
    this.props.increaseNumberOfItemsInCart(item, index, this.props.currentTab)
  }

  decreaseNumberOfItemsInCart = (item, index) => {
    this.props.decreaseNumberOfItemsInCart(item, index, this.props.currentTab)
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <ImageBackground
          source={{ uri: this.props.item.image.url }}
          style={styles.itemBgImage}
          resizeMode="contain"
        >
          {this.props.item.isAddedToCart && (
            <View style={styles.itemBgCheckBoxContainer}>
              <AntDesignIcon name="checkcircleo" size={20} color="#eeaf3b" />
            </View>
          )}
        </ImageBackground>
        <View style={styles.itemAndPriceContainer}>
          <Text style={styles.itemNameText}>{this.props.item.name}</Text>
          <Text
            style={styles.itemPriceText}
          >{`#${this.props.item.price}`}</Text>
        </View>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            onPress={() =>
              this.increaseNumberOfItemsInCart(
                this.props.item,
                this.props.index
              )
            }
          >
            <EntypoIcon name="plus" size={30} color="#eeaf3b" />
          </TouchableOpacity>
          <TextInput
            style={styles.counterText}
            onChangeText={userInput =>
              this.onChangeNoInCart(
                userInput,
                this.props.item,
                this.props.index
              )
            }
            value={this.props.item.noInCart.toString()}
            keyboardType={'numeric'}
            selectTextOnFocus
          />
          <TouchableOpacity
            onPress={() =>
              this.decreaseNumberOfItemsInCart(
                this.props.item,
                this.props.index
              )
            }
          >
            <EntypoIcon name="minus" size={30} color="#eeaf3b" />
          </TouchableOpacity>
        </View>
      </View>
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
    increaseNumberOfItemsInCart: (item, index, currentTab) => {
      if (currentTab === 'bar') {
        dispatch(addItemToBar(item, index))
      } else if (currentTab === 'restaurant') {
        dispatch(addItemToRestaurant(item, index))
      }
      // dispatch(increaseNoInCart(item))
    },
    decreaseNumberOfItemsInCart: (item, index, currentTab) => {
      if (currentTab === 'bar') {
        dispatch(removeItemFromBar(item, index))
      } else if (currentTab === 'restaurant') {
        dispatch(removeItemFromRestaurant(item, index))
      }
    },
    onChangeNoInCart: (userInput, item, index, currentTab) => {
      if (currentTab === 'bar') {
        dispatch(editNoOfItemInBar(userInput, item, index))
      } else if (currentTab === 'restaurant') {
        dispatch(editNoOfItemInRestaurant(userInput, item, index))
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridItem)

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
    padding: 5
  },
  itemBgImage: {
    width: '100%',
    height: 80
  },
  itemBgCheckBoxContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  itemAndPriceContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  itemNameText: {
    fontWeight: 'bold',
    fontSize: 15
  },
  itemPriceText: {
    color: 'gray'
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7
  },
  counterText: {
    fontSize: 20,
    borderColor: 'transparent'
  }
})
