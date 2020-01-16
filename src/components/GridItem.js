import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { getImage } from '../config'
const deviceWidth = Dimensions.get('window').width

class GridItem extends Component {
  constructor(props) {
    super(props)
  }

  onUpdate = (type, itemId, value) => {
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
    this.props.onChange(amount, type, itemId)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.item === nextProps.item) {
      return false;
    }
    return true;
  }

  render() {

    return (
      <View style={styles.itemContainer}>
        <TouchableWithoutFeedback onPress={() => this.onUpdate('increment', this.props.item.itemId)}>
          <View>
            <ImageBackground
              source={{ uri: getImage(this.props.item.image.url) }}
              style={styles.itemBgImage}
              resizeMode="contain"
            >
              {this.props.item.isAddedToCart && (
                <View style={styles.itemBgCheckBoxContainer}>
                  <AntDesignIcon
                    name="checkcircleo"
                    size={20}
                    color="#c98811"
                  />
                </View>
              )}
            </ImageBackground>
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
              <TouchableWithoutFeedback
                onPress={() => this.onUpdate('increment', this.props.item.itemId)}
              >
                <EntypoIcon name="plus" size={30} color="#c98811" />
              </TouchableWithoutFeedback>
              <TextInput
                style={styles.counterText}
                onChangeText={userInput =>
                  this.onUpdate('input', this.props.item.itemId, Number(userInput))
                }
                defaultValue={this.props.item.noInCheckOut.toString()}
                keyboardType={'numeric'}
                selectTextOnFocus
              />
              <TouchableWithoutFeedback
                onPress={() => this.onUpdate('decrement', this.props.item.itemId)}
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
)(GridItem)

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
    // maxWidth: '45%',
    width: (deviceWidth - 60) / 2,
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
