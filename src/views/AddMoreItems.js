import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import TabBar from '@mindinventory/react-native-tab-bar-interaction'
import { connect } from 'react-redux'
import GridItem from '../components/GridItem'
import { updateNoOfItemInRestaurant } from '../store/actions/restaurantActions'
import { updateNoOfItemInBar } from '../store/actions/barActions'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

class AddMoreItems extends Component {
  constructor() {
    super()
  }

  closeModal = () => {
    this.props.onCloseModal()
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
      <View style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.bottomSheetHeader}>
            {/* <TouchableOpacity
                onPress={() => {
                  this.hideCheckOutModal()
                  this.setModalVisible()
                }}
              >
                <FeatherIcon name="send" size={25} color="#fff" />
              </TouchableOpacity> */}
            <Text style={styles.bottomSheetHeaderText}>
              Add more Items to Order
            </Text>
            <TouchableOpacity onPress={() => this.closeModal()}>
              <AntDesignIcon
                style={{ marginLeft: 25 }}
                name="close"
                size={25}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <TabBar>
            <TabBar.Item
              icon={require('../../assets/2325619-200.png')}
              selectedIcon={require('../../assets/2325619-200.png')}
              title="Restaurant"
            >
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
                </ScrollView>
              </View>
            </TabBar.Item>
            <TabBar.Item
              icon={require('../../assets/917640-200.png')}
              selectedIcon={require('../../assets/917640-200.png')}
              title="Bar"
            >
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
            </TabBar.Item>

            <TabBar.Item
              icon={require('../../assets/1570216-200.png')}
              selectedIcon={require('../../assets/1570216-200.png')}
              title="Cart"
            >
              <View>
                <Text>New Items to Order</Text>
              </View>
            </TabBar.Item>
          </TabBar>
        </View>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    bar: state.barReducer.bar,
    barCheckOut: state.barReducer.barCheckOut,
    restaurant: state.restaurantReducer.restaurant,
    restaurantCheckOut: state.restaurantReducer.restaurantCheckOut
  }
}

mapDispatchToProps = dispatch => {
  return {
    updateNoOfItemInBar: (value, index) => {
      dispatch(updateNoOfItemInBar(value, index))
    },
    updateNoOfItemInRestaurant: (value, index) => {
      dispatch(updateNoOfItemInRestaurant(value, index))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMoreItems)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column'
  },
  bottomSheetHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c98811',
    height: 40,
    padding: 10,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  bottomSheetHeaderText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold'
  },
  gridContainer: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5
  },
  gridLayout: {
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between'
  }
})
