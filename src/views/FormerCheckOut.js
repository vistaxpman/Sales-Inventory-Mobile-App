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
  ToastAndroid,
  Dimensions
} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { connect } from 'react-redux'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import CheckOutItem from '../components/CheckOutItem'

function barCheckOutRoute({ barCheckOut }) {
  return (
    <View style={styles.listContainer}>
      {barCheckOut.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcon name="remove-shopping-cart" size={50} color="gray" />
          <Text style={styles.emptyText}>
            No item to Order. Place an order now
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <List
            data={barCheckOut}
            renderItem={renderItem}
            style={styles.listLayout}
          />
        </ScrollView>
      )}
    </View>
  )
}

function restaurantCheckOutRoute({ restaurantCheckOut }) {
  return (
    <View style={styles.listContainer}>
      {restaurantCheckOut.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcon name="remove-shopping-cart" size={50} color="gray" />
          <Text style={styles.emptyText}>
            No item to Order. Place an order now
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <List
            data={restaurantCheckOut}
            renderItem={renderItem}
            style={styles.listLayout}
          />
        </ScrollView>
      )}
    </View>
  )
}

class CheckOut extends Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      routes: [
        { key: 'bar', title: 'Bar' },
        { key: 'restaurant', title: 'Restaurant' }
      ]
    }
  }

  itemsInCheckOut = () => {
    return [...this.props.barCheckOut, ...this.props.restaurantCheckOut]
  }

  renderItem = ({ item, index }) => <CheckOutItem item={item} />

  renderLabel = ({ route, focused, color }) => {
    return (
      <View>
        <Text
          style={[
            styles.tabText,
            focused ? styles.activeTabTextColor : styles.tabTextColor
          ]}
        >
          {route.title}
        </Text>
      </View>
    )
  }
  toggleActiveTab = index => {
    this.setState({ index })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            bar: barCheckOutRoute,
            restaurant: restaurantCheckOutRoute
          })}
          onIndexChange={index => this.toggleActiveTab(index)}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: '#eeaf3b' }}
              style={{ backgroundColor: '#303030', height: 20 }}
              indicatorStyle={{ backgroundColor: '#eeaf3b', height: 5 }}
              renderLabel={this.renderLabel}
            />
          )}
        />
        {/* <View
          style={{ height: 30, width: '100%', backgroundColor: 'green' }}
        ></View> */}
        {/* <View style={styles.listContainer}>
          {this.itemsInCheckOut().length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcon
                name="remove-shopping-cart"
                size={50}
                color="gray"
              />
              <Text style={styles.emptyText}>
                No item to Order. Place an order now
              </Text>
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
        </View> */}
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

export default {
  CheckOut: connect(
    mapStateToProps,
    mapDispatchToProps
  )(CheckOut),
  barCheckOutRoute: connect(
    mapStateToProps,
    mapDispatchToProps
  )(barCheckOutRoute),
  restaurantCheckOutRoute: connect(
    mapStateToProps,
    mapDispatchToProps
  )(restaurantCheckOutRoute)
}

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
  },
  activeTabTextColor: {
    color: '#eeaf3b'
  },
  tabTextColor: {
    color: '#ccc'
  },
  tabText: {
    fontWeight: 'bold'
  }
})
