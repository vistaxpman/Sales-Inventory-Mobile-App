import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import axios from 'axios'
import { Spinner } from 'react-native-ui-kitten'
import { setStaffData } from '../store/actions/homeActions'
import { connect } from 'react-redux'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
      appId: 'invexBar&Restaurant',
      errorMessage: '',
      isLoading: false
    }
  }

  storeData = async staffData => {
    try {
      this.props.setStaffData(staffData)
      await AsyncStorage.setItem('staffData', JSON.stringify(staffData))
    } catch (e) {
      console.error(e)
    }
  }

  handleLogin = () => {
    this.setState({
      errorMessage: ''
    })
    let username = this.state.username,
      password = this.state.password,
      appId = this.state.appId
    if (!username) {
      this.setState({ usernameError: true })
    } else if (!password) {
      this.setState({ passwordError: true })
    } else {
      this.setState({
        isLoading: true
      })
      axios
        .post('http://192.168.8.112:3000/login', {
          username,
          password,
          appId
        })
        .then(response => {
          if (response.data.loginMessage === 'success') {
            this.storeData(response.data.staffData)
            this.props.navigation.replace('Home')
          } else if (response.data.loginMessage === 'failed') {
            this.setState({
              errorMessage: 'Invalid Login',
              isLoading: false
            })
          }
        })
        .catch(err => {
          this.setState({
            errorMessage: 'An error occured. Please try again',
            isLoading: false
          })
          console.log(err)
        })
    }
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
          <View style={styles.container2}>
            <Text style={styles.titleText}>Invex for Bar & Restaurant</Text>
            <Text
              style={{
                color: 'red',
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 20
              }}
            >
              {this.state.errorMessage}
            </Text>
            <View style={styles.textInputContainer}>
              {this.state.usernameError && (
                <Text style={styles.textErrorStyle}>
                  Username cannot be empty
                </Text>
              )}
              <TextInput
                onChangeText={username =>
                  this.setState({
                    usernameError: false,
                    username: username,
                    errorMessage: ''
                  })
                }
                style={styles.textInputStyle}
                placeholder="Email"
              />
            </View>
            <View style={styles.textInputContainer}>
              {this.state.passwordError && (
                <Text style={styles.textErrorStyle}>
                  Password cannot be empty
                </Text>
              )}
              <TextInput
                onChangeText={password =>
                  this.setState({
                    passwordError: false,
                    password: password,
                    errorMessage: ''
                  })
                }
                style={styles.textInputStyle}
                placeholder="Password"
              />
            </View>
          </View>
          <View style={styles.loginButtonContainer}>
            <TouchableOpacity
              style={styles.loginButtonStyle}
              activeOpacity={0.5}
              onPress={this.handleLogin}
            >
              {this.state.isLoading ? (
                <Spinner size="large" status="primary" />
              ) : (
                <Text style={styles.loginTextStyle}> LOGIN </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

mapDispatchToProps = dispatch => {
  return {
    setStaffData: staffData => {
      dispatch(setStaffData(staffData))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'stretch'
  },
  container2: {
    display: 'flex',
    flexDirection: 'column',
    padding: 30
  },
  titleText: {
    fontSize: 22,
    color: '#303030',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20
  },
  textInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 25
  },
  textErrorStyle: {
    color: 'red'
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#ccc',
    fontSize: 16,
    marginTop: 5
  },
  loginButtonStyle: {
    marginTop: 30,
    paddingTop: 13,
    paddingBottom: 13,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#c98811',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginTextStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
})
