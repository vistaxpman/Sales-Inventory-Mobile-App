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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class CheckOutItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: false
    }
  }

  onUpdate = (type, value) => {
    let amount = this.props.item.noInCheckOut
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

  onDelete = () => {
    this.props.onToBeDeleted(true)
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <View style={{ width: '10%', padding: 5 }}>
          <TouchableOpacity onPress={() => this.onDelete()}>
            <MaterialCommunityIcons name="close" size={30} color="gray" />
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: this.props.item.image.url }}
          style={styles.itemBgImage}
          resizeMode="contain"
        />
        <View style={styles.itemAndPriceContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.itemNameText}
          >
            {this.props.item.name}
          </Text>
          <Text
            style={styles.itemPriceText}
          >{`₦${this.props.item.price}`}</Text>
        </View>
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={() => this.onUpdate('increment')}>
            <EntypoIcon name="plus" size={30} color="#c98811" />
          </TouchableOpacity>
          <TextInput
            style={styles.counterText}
            defaultValue={this.props.item.noInCheckOut.toString()}
            onChangeText={userInput =>
              this.onUpdate('input', Number(userInput))
            }
            keyboardType={'numeric'}
            selectTextOnFocus
          />
          <TouchableOpacity onPress={() => this.onUpdate('decrement')}>
            <EntypoIcon name="minus" size={30} color="#c98811" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

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
    paddingBottom: 3,
    backgroundColor: '#fff'
  },
  itemBgImage: {
    height: '100%',
    width: '25%',
    paddingRight: 5
  },
  itemAndPriceContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '52%',
    paddingRight: 5
  },
  itemNameText: {
    display: 'flex',
    fontSize: 17,
    marginBottom: 7
  },
  itemPriceText: {
    color: 'gray'
  },
  counterContainer: {
    display: 'flex',
    height: '100%',
    width: '13%',
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
