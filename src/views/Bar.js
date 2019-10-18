import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, FlatList, Text } from 'react-native'
import GridItem from '../components/GridItem'
import { updateNoOfItemInBar } from '../store/actions/barActions'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

class Bar extends Component {
  constructor() {
    super()
  }

  renderGridItem = ({ item, index }) => (
    <GridItem
      item={item}
      index={index}
      onChange={(value, eventType) => {
        this.props.updateNoOfItemInBar(value, index)
      }}
    />
  )

  render() {
    return (
      <View style={styles.gridContainer}>
        {this.props.bar.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcon name="hourglass-empty" size={50} color="gray" />
            <Text style={styles.emptyText}>None Found.</Text>
          </View>
        ) : (
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
        )}
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
    updateNoOfItemInBar: (value, index) => {
      dispatch(updateNoOfItemInBar(value, index))
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
  },
  emptyContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10
  }
})
