import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, StyleSheet } from 'react-native'
import Bar from './Bar'
import Restaurant from './Restaurant'

const NavigationStack = createMaterialBottomTabNavigator(
  {
    Bar: {
      screen: Bar,
      navigationOptions: {
        tabBarIcon: () => <Icon name="wine-bottle" size={25} color="#eeaf3b" />
      }
    },
    Restaurant: {
      screen: Restaurant,
      navigationOptions: {
        tabBarIcon: () => (
          <MaterialIcon name="food-variant" size={25} color="gray" />
        )
      }
    }
  },
  {
    initialRouteName: 'Bar',
    activeColor: '#eeaf3b',
    inactiveColor: 'gray',
    barStyle: { backgroundColor: '#eee' },
    tabBarOptions: {
      showIcon: true,
      labelStyle: {
        fontSize: 20,
        margin: 0,
        padding: 0
      }
    }
  }
)

const AppNavigator = createAppContainer(NavigationStack)

export default AppNavigator
