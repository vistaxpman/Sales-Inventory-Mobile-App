import React, { Component } from 'react'
import { List, ListItem } from 'react-native-ui-kitten'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SalesItemsContainer from '../components/SalesItemsContainer'

class Sales extends Component {
  constructor() {
    super()
  }

  renderItem = ({ item, index }) => <SalesItemsContainer item={item} />

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.layoutContainer}>
          <View style={{ display: 'flex', padding: 5, flexDirection: 'row' }}>
            <Text style={styles.layoutTitleText}>Sales</Text>
            <View
              style={{
                marginLeft: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text>Total Amount:</Text>
              <Text style={{ color: 'gray' }}>{`₦${'25,000'}`}</Text>
            </View>
          </View>
          <View style={styles.listContainer}>
            {this.props.itemsInCart.length === 0 ? (
              <View style={styles.emptyContainer}>
                <MaterialIcon
                  name="remove-shopping-cart"
                  size={80}
                  color="gray"
                />
                <Text style={styles.emptyText}>Sales is empty.</Text>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                <List
                  data={this.props.itemsInCart}
                  renderItem={this.renderItem}
                  style={styles.listLayout}
                />
              </ScrollView>
            )}
          </View>
        </View>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    itemsInCart: state.cartReducer.itemsInCart
  }
}

mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sales)

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    marginTop: 5,
    backgroundColor: '#F5FCFF',
    paddingLeft: 5,
    paddingRight: 5
  },
  layoutTitleText: {
    fontSize: 17,
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
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
