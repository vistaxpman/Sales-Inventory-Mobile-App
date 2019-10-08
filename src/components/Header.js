import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import { Header as NativeHeader } from 'react-native-elements'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const SearchBar = () => (
  <View style={styles.searchBarStyle}>
    <TextInput style={styles.searchInputStyle} placeholder="Search" />
    <AntDesignIcon name="search1" size={17} color="gray" />
  </View>
)

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screen: this.props.screen
    }
  }

  handleCartIcon = () => {
    this.props.navigation.navigate('Cart')
  }

  render() {
    Invex = () => <Text style={styles.invexText}>Invex</Text>

    CartIcon = () => (
      <TouchableOpacity onPress={this.handleCartIcon}>
        <MaterialCommunityIcon name="cart" size={30} color="#fff" />
      </TouchableOpacity>
    )

    return (
      <NativeHeader
        leftComponent={<Invex />}
        centerComponent={<SearchBar />}
        rightComponent={<CartIcon />}
        containerStyle={{
          backgroundColor: '#eeaf3b',
          justifyContent: 'space-around'
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  invexText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  searchBarStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    width: 200,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 20,
    paddingRight: 10,
    paddingLeft: 10
  },
  searchInputStyle: {
    fontSize: 15,
    width: 160
  }
})

export default withNavigation(Header)
