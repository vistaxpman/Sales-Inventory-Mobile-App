import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TextInput
} from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { connect } from 'react-redux'

class SalesItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
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
          <Text style={styles.counterText}>
            {this.props.item.noInCart.toString()}
          </Text>
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
)(SalesItem)

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 110,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingTop: 7,
    paddingBottom: 7
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
    justifyContent: 'center'
  },
  counterText: {
    fontSize: 20,
    borderColor: 'transparent',
    justifyContent: 'center',
    textAlign: 'center'
  }
})
