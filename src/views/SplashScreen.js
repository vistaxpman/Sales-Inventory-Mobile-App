import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { socket } from '../services/socketIO'
import AppLogo from '../assets/invex.png'
import { setStaffData } from '../store/actions/homeActions'
import { populateOngoingTransactionsInCart } from '../store/actions/cartActions'

class SplashScreen extends Component {
  constructor() {
    super()
  }

  initialRequests = () => {
    const { Staff_ID } = this.props.staffData
    socket.emit('getStaffUpdatedData', Staff_ID, response => {
      if (Staff_ID !== response.Staff_ID) {
      }
      this.props.setStaffData(response)
    })

    socket.emit('getOngoingTransactions', Staff_ID, response => {
      this.props.populateOngoingTransactionsInCart(response)
    })
  }

  componentDidMount() {
    ;(staffData = async () => {
      await AsyncStorage.getItem('staffData').then(value => {
        if (value) {
          this.props.setStaffData(JSON.parse(value))
          this.initialRequests()
          this.props.navigation.replace('Home')
        } else {
          this.props.navigation.replace('Login')
        }
      })
    })()
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#F5FCFF'
        }}
      >
        <View style={styles.container}>
          <Image source={AppLogo} />
        </View>
      </View>
    )
  }
}

mapStateToProps = state => {
  return { staffData: state.homeReducer.staffData }
}

mapDispatchToProps = dispatch => {
  return {
    setStaffData: staffData => {
      dispatch(setStaffData(staffData))
    },
    populateOngoingTransactionsInCart: ongoingTransactions => {
      dispatch(populateOngoingTransactionsInCart(ongoingTransactions))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
