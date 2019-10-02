import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'

const SearchBar = () => (
  <View style={styles.searchBarStyle}>
    <TextInput style={styles.searchInputStyle} placeholder="Search" />
    <Icon name="search1" size={17} color="gray" />
  </View>
)

export default class Restaurant extends Component {
  render() {
    Invex = () => <Text style={styles.invexText}>Invex</Text>
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Header
          leftComponent={<Invex />}
          centerComponent={<SearchBar />}
          rightComponent={{ icon: 'shopping-cart', color: '#fff' }}
          containerStyle={{
            backgroundColor: '#eeaf3b',
            justifyContent: 'space-around'
          }}
        />
        <View style={styles.barContainer}>
          <Text>Restaurant</Text>
        </View>
      </View>
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
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
})
