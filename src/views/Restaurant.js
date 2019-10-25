import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  AsyncStorage
} from 'react-native'
import axios from 'axios'
import GridItem from '../components/GridItem'
import {
  updateNoOfItemInRestaurant,
  populateItemsInRestaurant
} from '../store/actions/restaurantActions'
import { populateMoreItemsInRestaurant } from '../store/actions/moreItemsToOrderActions'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Spinner } from 'react-native-ui-kitten'

class Restaurant extends Component {
  constructor() {
    super()
    this.state = {
      isLoadingRestaurantItems: true
    }
  }

  componentDidMount() {
    this.fetchItemsFromLocalStorage()
  }

  fetchItemsFromLocalStorage = async () => {
    // await AsyncStorage.getItem('restaurant').then(items => {
    //   if (items) {
    //     this.props.populateItemsInRestaurant(JSON.parse(items))
    //     this.setState({
    //       isLoadingRestaurantItems: false
    //     })
    //   } else {
    this.fetchItemsFromOnline()
    //   }
    // })
  }

  fetchItemsFromOnline = () => {
    let url = 'http://192.168.8.109:3000/getItemsFromRestaurant'
    axios
      .get(url)
      .then(async response => {
        if (response.data.hasItems) {
          this.props.populateItemsInRestaurant(response.data.items)
          // await AsyncStorage.setItem(
          //   'restaurant',
          //   JSON.stringify(response.data.items)
          // )
          this.setState({
            isLoadingRestaurantItems: false
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
        this.props.updateNoOfItemInRestaurant(value, index)
      }}
    />
  )

  render() {
    return (
      <View style={styles.gridContainer}>
        {this.state.isLoadingRestaurantItems ? (
          <View style={styles.emptyContainer}>
            <Spinner size="giant" status="alternative" />
          </View>
        ) : this.props.restaurant.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcon name="hourglass-empty" size={50} color="gray" />
            <Text style={styles.emptyText}>None Found.</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={this.props.restaurant}
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
    restaurant: state.restaurantReducer.restaurant,
    restaurantCheckOut: state.restaurantReducer.restaurantCheckOut
  }
}

mapDispatchToProps = dispatch => {
  return {
    updateNoOfItemInRestaurant: (value, index) => {
      dispatch(updateNoOfItemInRestaurant(value, index))
    },
    populateItemsInRestaurant: value => {
      dispatch(populateItemsInRestaurant(value))
      dispatch(populateMoreItemsInRestaurant(value))
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
