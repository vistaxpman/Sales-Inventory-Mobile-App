import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, FlatList } from 'react-native'
import GridItem from '../components/GridItem'
import { updateNoOfItemInRestaurant } from '../store/actions/restaurantActions'

class Restaurant extends Component {
  constructor() {
    super()
  }

  renderGridItem = ({ item, index }) => (
    <GridItem
      item={item}
      index={index}
      onChange={(value, eventType) => {
        this.props.updateNoOfItemInRestaurant(value, item, index, eventType)
      }}
    />
  )

  render() {
    return (
      <View style={styles.gridContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={this.props.restaurant}
            keyExtractor={item => item.itemId}
            renderItem={this.renderGridItem}
            horizontal={false}
            numColumns={2}
            contentContainerStyle={styles.gridLayout}
          />
          {/* {this.props.restaurant.map((item, index) => {
            return (
              <GridItem style={styles.gridItem} item={item} index={index} />
            )
          })} */}
        </ScrollView>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    restaurant: state.restaurantReducer.restaurant,
    restaurantCheckOut: state.restaurantReducer.restaurantCheckOut
  }
}

mapDispatchToProps = dispatch => {
  return {
    updateNoOfItemInRestaurant: (value, item, index, eventType) => {
      dispatch(updateNoOfItemInRestaurant(value, item, index, eventType))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant)

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
    marginTop: 15,
    paddingLeft: 5,
    paddingRight: 5
  },
  gridLayout: {
    flex: 1,
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between'
  }
})
