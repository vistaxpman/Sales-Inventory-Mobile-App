import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native'
import { connect } from 'react-redux'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { getImage } from '../config'

class GridItem1 extends Component {
  constructor(props) {
    super(props)
  }

  onUpdate = (type, itemId, value) => {
    let amount = this.props.item.noInCheckOut,
    quantity = this.props.item.Quantity;
        
    switch (type) {
      case 'increment':
        let newAmount = amount + 1;
        if(newAmount > quantity){
          ToastAndroid.show('Item cannot be more than quantity in inventory!', ToastAndroid.SHORT)
        }else{
          amount = newAmount
        }
        break
      case 'decrement':
        amount = amount - (amount ? 1 : 0)
        break
      case 'input':
        if(value > quantity){
          ToastAndroid.show('Item cannot be more than quantity in inventory!', ToastAndroid.SHORT)
        }else{
          amount = value
        }     
        break
      default:
        break
    }
    this.props.onChange(amount, type, itemId)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.item === nextProps.item) {
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    let item = this.props.item;
    return (
      <View style={styles.itemContainer}>
        <TouchableWithoutFeedback onPress={() => this.onUpdate('increment', item.itemId)}>
          <View>
            <ImageBackground
              source={{ uri: getImage(item.image.url) }}
              style={styles.itemBgImage}
              resizeMode="contain"/>
            <View style={styles.itemAndPriceContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.itemNameText}
              >
                {item.name}
              </Text>
              <Text
                style={styles.itemPriceText}
              >{`₦${item.price}`}</Text>
            </View>
            <View style={styles.counterContainer}>
              <TouchableWithoutFeedback
                onPress={() => this.onUpdate('increment', item.itemId)}
              >
                <EntypoIcon name="plus" size={30} color="#c98811" />
              </TouchableWithoutFeedback>
              <TextInput
                style={styles.counterText}
                onChangeText={userInput =>
                  this.onUpdate('input', item.itemId, Number(userInput))
                }
                value={item.noInCheckOut.toString()}
                keyboardType={'numeric'}
                selectTextOnFocus
              />
              <TouchableWithoutFeedback
                onPress={() => this.onUpdate('decrement', item.itemId)}
              >
                <EntypoIcon name="minus" size={30} color="#c98811" />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    currentTab: state.homeReducer.currentTab
  }
}

export default connect(
  mapStateToProps,
  null
)(GridItem1)

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
    padding: 5,
    maxWidth: '45%',
    // width: (deviceWidth - 60) / 2,
    // height: (deviceWidth - 60) / 2,
    margin: 10,
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
    flex: 1,
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
