import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, FlatList } from 'react-native'
import GridItem from '../components/GridItem'

class Restaurant extends Component {
  constructor() {
    super()
  }

  renderGridItem = ({ item, index }) => <GridItem item={item} index={index} />

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
            style={styles.gridLayout}
          />
        </ScrollView>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    restaurant: state.restaurantReducer.restaurant,
    restaurantCart: state.restaurantReducer.restaurantCart
  }
}

mapDispatchToProps = dispatch => {
  return {}
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
    marginBottom: 30
  }
})
