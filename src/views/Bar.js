import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, FlatList, Text } from 'react-native'
import axios from 'axios'
import GridItem from '../components/GridItem'
import {
  updateNoOfItemInBar,
  populateItemsInBar
} from '../store/actions/barActions'
import { populateMoreItemsInBar } from '../store/actions/moreItemsToOrderActions'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Spinner } from 'react-native-ui-kitten'
import { appUrl } from '../config'

class Bar extends Component {
  constructor() {
    super()
    this.state = {
      isLoadingBarItems: true
    }
  }

  componentDidMount() {
    this.fetchItemsFromLocalStorage()
  }

  fetchItemsFromLocalStorage = async () => {
    // let location = 'OldBar'
    // if (this.props.staffData.Branch === 'New Bar') {
    //   location = 'NewBar'
    // }
    // await AsyncStorage.getItem(location).then(items => {
    //   if (items) {
    //     this.props.populateItemsInBar(JSON.parse(items))
    //     this.setState({
    //       isLoadingBarItems: false
    //     })
    //   } else {
    this.fetchItemsFromOnline()
    //   }
    // })
  }

  fetchItemsFromOnline = () => {
    let url = '',
      location = ''
    if (this.props.staffData.Branch === 'Old Bar') {
      url = appUrl + '/getItemsFromOldBar'
      location = 'OldBar'
    } else if (this.props.staffData.Branch === 'New Bar') {
      url = appUrl + '/getItemsFromNewBar'
      location = 'NewBar'
    }
    axios
      .get(url)
      .then(async response => {
        if (response.data.hasItems) {
          this.props.populateItemsInBar(response.data.items)
          // await AsyncStorage.setItem(
          //   location,
          //   JSON.stringify(response.data.items)
          // )
          this.setState({
            isLoadingBarItems: false
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
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
        {this.state.isLoadingBarItems ? (
          <View style={styles.emptyContainer}>
            <Spinner size="giant" status="alternative" />
          </View>
        ) : this.props.bar.length === 0 ? (
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
    barCheckOut: state.barReducer.barCheckOut,
    staffData: state.homeReducer.staffData
  }
}

mapDispatchToProps = dispatch => {
  return {
    updateNoOfItemInBar: (value, index) => {
      dispatch(updateNoOfItemInBar(value, index))
    },
    populateItemsInBar: value => {
      dispatch(populateItemsInBar(value))
      dispatch(populateMoreItemsInBar(value))
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
