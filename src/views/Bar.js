import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, FlatList } from 'react-native'
import GridItem from '../components/GridItem'
import { updateNoOfItemInBar } from '../store/actions/barActions'

class Bar extends Component {
  constructor() {
    super()
  }

  // increaseNumberOfItemInCart = itemId => {
  //   const currentNoInCart = this.state.bar[3].noInCart
  //   const noInCart = Number(currentNoInCart) + 1
  //   this.setState({
  //     bar: update(this.state.bar, {
  //       3: { noInCart: { $set: `${noInCart}` } }
  //     })
  //   })
  // }

  renderGridItem = ({ item, index }) => (
    <GridItem
      item={item}
      index={index}
      onChange={(value, eventType) => {
        this.props.updateNoOfItemInBar(value, item, index, eventType)
      }}
    />
  )

  render() {
    return (
      <View style={styles.gridContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={this.props.bar}
            keyExtractor={item => item.itemId}
            renderItem={this.renderGridItem}
            horizontal={false}
            numColumns={2}
            contentContainerStyle={styles.gridLayout}
          />
        </ScrollView>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    bar: state.barReducer.bar,
    barCheckOut: state.barReducer.barCheckOut
  }
}

mapDispatchToProps = dispatch => {
  return {
    updateNoOfItemInBar: (value, item, index, eventType) => {
      dispatch(updateNoOfItemInBar(value, item, index, eventType))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bar)

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
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between'
  }
})
