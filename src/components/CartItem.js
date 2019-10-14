import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { connect } from 'react-redux'

class CartItem extends Component {
  constructor(props) {
    super(props)
  }

  onUpdate = (type, value) => {
    let amount = this.props.item.noInCart
    switch (type) {
      case 'increment':
        amount = amount + 1
        break
      case 'decrement':
        amount = amount - (amount ? 1 : 0)
        break
      case 'input':
        amount = value
        break
      default:
        break
    }
    this.props.onChange(amount, type)
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.onUpdate('increment')
        }}
      >
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: this.props.item.image.url }}
            style={styles.itemBgImage}
            resizeMode="contain"
          />
          <View style={styles.itemAndPriceContainer}>
            <Text style={styles.itemNameText}>{this.props.item.name}</Text>
            <Text
              style={styles.itemPriceText}
            >{`₦${this.props.item.price}`}</Text>
          </View>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              onPress={() => {
                this.onUpdate('increment')
              }}
            >
              <EntypoIcon name="plus" size={30} color="#c98811" />
            </TouchableOpacity>
            <TextInput
              style={styles.counterText}
              value={this.props.item.noInCart.toString()}
              onChangeText={userInput =>
                this.onUpdate('input', Number(userInput))
              }
              keyboardType={'numeric'}
              selectTextOnFocus
            />
            <TouchableOpacity
              onPress={() => {
                this.onUpdate('decrement')
              }}
            >
              <EntypoIcon name="minus" size={30} color="#c98811" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
)(CartItem)

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 110,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingTop: 3,
    paddingBottom: 3
  },
  itemBgImage: {
    height: '100%',
    width: '25%',
    marginRight: 10
  },
  itemAndPriceContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '55%',
    marginRight: 10
  },
  itemNameText: {
    fontSize: 17,
    marginBottom: 7
  },
  itemPriceText: {
    color: 'gray'
  },
  counterContainer: {
    display: 'flex',
    height: '100%',
    width: '15%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  counterText: {
    fontSize: 20,
    borderColor: 'transparent',
    justifyContent: 'center',
    textAlign: 'center'
  }
})
