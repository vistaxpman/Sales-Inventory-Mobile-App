import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'

export default class Grid extends Component {
  render() {
    return (
      <View style={styles.gridContainer}>
        <View style={styles.gridContainer2}>
          <View style={styles.singleColumn}>
            <Text>One</Text>
          </View>
          <View style={styles.singleColumn}>
            <Text>Two</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1
  },
  gridContainer2: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    borderColor: 'red',
    borderWidth: 1,
    alignItems: 'stretch'
  },
  singleColumn: {
    width: 150,
    height: 80,
    backgroundColor: '#4CAF50'
  }
})
