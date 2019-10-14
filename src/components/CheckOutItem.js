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
  TouchableWithoutFeedback,
  ToastAndroid
} from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { connect } from 'react-redux'

class CheckOutOut extends Component {
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
    this.setState({
      isSelected: !this.state.isSelected
    })
    this.props.onToBeDeleted(this.state.isSelected)
    this.setState({
      isSelected: !this.state.isSelected
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.onUpdate('increment')}
        onLongPress={() => this.onDelete()}
      >
        <View
          style={[
            styles.itemContainer,
            this.state.isSelected ? styles.itemSelectedContainer : null
          ]}
        >
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
            <TouchableOpacity onPress={() => this.onUpdate('increment')}>
              <EntypoIcon name="plus" size={30} color="#c98811" />
            </TouchableOpacity>
            <TextInput
              style={styles.counterText}
              value={this.props.item.noInCheckOut.toString()}
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
)(CheckOutOut)

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
  itemSelectedContainer: {
    borderColor: 'red',
    borderWidth: 1,
    borderBottomColor: 'red',
    borderBottomWidth: 1
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
