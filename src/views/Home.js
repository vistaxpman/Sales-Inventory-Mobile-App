import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Bottom from '../components/Bottom'
import { toggleAreYouSureModalVisibility } from '../store/actions/homeActions'
import { changeTab } from '../store/actions/homeActions'
import Bar from './Bar'
import Restaurant from './Restaurant'
import MainLayout from './MainLayout'

class Home extends Component {
  constructor() {
    super()
    this.state = {}
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.showConfirmationDialog()}
        <Header screen="bar" />
        <View style={styles.layoutContainer}>
          <View style={styles.tabContainer}>
            {/* <TouchableWithoutFeedback
              onPress={() => this.toggleActiveTab('bar')}
            > */}
            <Text
              onPress={() => this.toggleActiveTab('bar')}
              style={[
                this.props.currentTab === 'bar'
                  ? styles.activeLayoutTitleText
                  : styles.layoutTitleText
              ]}
            >
              Bar
            </Text>
            {/* </TouchableWithoutFeedback> */}
            {/* <TouchableWithoutFeedback
              onPress={() => this.toggleActiveTab('restaurant')}
            > */}
            <Text
              onPress={() => this.toggleActiveTab('restaurant')}
              style={[
                this.props.currentTab === 'restaurant'
                  ? styles.activeLayoutTitleText
                  : styles.layoutTitleText
              ]}
            >
              Restaurant
            </Text>
            {/* </TouchableWithoutFeedback> */}
          </View>
          {/* {this.activeTab()} */}
          {/* {this.props.currentTab === 'bar' && <Bar />}
          {this.props.currentTab === 'restaurant' && <Restaurant />} */}
          <MainLayout />
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
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15
  },
  layoutTitleText: {
    fontSize: 17,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'gray',
    backgroundColor: '#fff',
    borderRadius: 3,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15
  },
  activeLayoutTitleText: {
    fontSize: 17,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#fff',
    backgroundColor: '#eeaf3b'
  }
})
