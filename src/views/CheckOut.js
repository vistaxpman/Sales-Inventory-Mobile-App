import React, { Component } from 'react'
import { List, ListItem } from 'react-native-ui-kitten'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
  TouchableHighlight,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import CheckOutItem from '../components/CheckOutItem'

class CheckOut extends Component {
  constructor() {
    super()
  }

  itemsInCheckOut = () => {
    this.props.barCheckOut.forEach(item => {
      item.outlet = 'bar'
    })
    this.props.restaurantCheckOut.forEach(item => {
      item.outlet = 'restaurant'
    })
    return [...this.props.barCheckOut, ...this.props.restaurantCheckOut]
  }

  renderItem = ({ item, index }) => <CheckOutItem item={item} />

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.listContainer}>
          {this.itemsInCheckOut().length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcon
                name="remove-shopping-cart"
                size={40}
                color="gray"
              />
              <Text style={styles.emptyText}>No item to Order.</Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <List
                data={this.itemsInCheckOut()}
                renderItem={this.renderItem}
                style={styles.listLayout}
              />
            </ScrollView>
          )}
        </View>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    barCheckOut: state.barReducer.barCheckOut,
    restaurantCheckOut: state.restaurantReducer.restaurantCheckOut
  }
}

mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckOut)

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15
  },
  listLayout: {
    marginBottom: 30,
    backgroundColor: 'transparent'
  },
  emptyContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 17,
    color: 'gray',
    marginTop: 10
  }
})
