import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../components/Header'
import Bottom from '../components/Bottom'
import { toggleAreYouSureModalVisibility } from '../store/actions/homeActions'
import { changeTab } from '../store/actions/homeActions'
import Bar from './Bar'
import Restaurant from './Restaurant'
import Cart from './Cart'

barRoute = () => {
  return <Bar />
}

restaurantRoute = () => {
  return <Restaurant />
}

cartRoute = () => {
  return <Cart />
}

class Home extends Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      routes: [
        { key: 'bar', title: 'Bar' },
        { key: 'restaurant', title: 'Restaurant' },
        { key: 'cart', title: 'Cart' }
      ]
    }
  }

  placeOrder = () => {}

  showConfirmationDialog = () => {
    if (this.props.areYouSureModalIsVisible) {
      return Alert.alert(
        'Confirm Order',
        'Are you sure you want to place this order ?',
        [
          {
            text: 'No',
            onPress: () => this.props.setModalVisible(),
            style: 'cancel'
          },
          { text: 'Yes', onPress: () => this.placeOrder() }
        ],
        { cancelable: true }
      )
    } else {
      return null
    }
  }

  setModalVisible = () => {
    this.props.setModalVisible(!this.props.areYouSureModalIsVisible)
  }

  activeTab = () => {
    return this.props.currentTab === 'bar' ? (
      <Bar />
    ) : this.props.currentTab === 'restaurant' ? (
      <Restaurant />
    ) : null
  }

  toggleActiveTab = tab => {
    this.props.toggleActiveTab(tab)
  }

  renderIcon = ({ route, focused, color }) => {
    return route.key === 'bar' ? (
      <View>
        {focused && (
          <FontAwesome5Icon name="wine-bottle" size={15} color="#eeaf3b" />
        )}
        {!focused && (
          <FontAwesome5Icon name="wine-bottle" size={15} color="#ccc" />
        )}
      </View>
    ) : route.key === 'restaurant' ? (
      <View>
        {focused && (
          <MaterialIcon name="food-variant" size={15} color="#eeaf3b" />
        )}
        {!focused && (
          <MaterialIcon name="food-variant" size={15} color="#ccc" />
        )}
      </View>
    ) : route.key === 'cart' ? (
      <View>
        {focused && (
          <MaterialCommunityIcon name="cart" size={15} color="#eeaf3b" />
        )}
        {!focused && (
          <MaterialCommunityIcon name="cart" size={15} color="#ccc" />
        )}
      </View>
    ) : null
  }

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

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.showConfirmationDialog()}
        <Header screen="bar" />
        <View style={styles.layoutContainer}>
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              bar: barRoute,
              restaurant: restaurantRoute,
              cart: cartRoute
            })}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: '#eeaf3b' }}
                style={{ backgroundColor: '#606060', height: 55 }}
                renderIcon={this.renderIcon}
                indicatorStyle={{ backgroundColor: '#eeaf3b', height: 5 }}
                renderLabel={this.renderLabel}
              />
            )}
          />
          <Bottom />
        </View>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    currentTab: state.homeReducer.currentTab,
    areYouSureModalIsVisible: state.homeReducer.areYouSureModalIsVisible
  }
}

mapDispatchToProps = dispatch => {
  return {
    setModalVisible: status => {
      dispatch(toggleAreYouSureModalVisibility(status))
    },
    toggleActiveTab: tab => {
      dispatch(changeTab(tab))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    backgroundColor: '#eee'
  },
  tabContainer: {
    backgroundColor: '#fff'
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
