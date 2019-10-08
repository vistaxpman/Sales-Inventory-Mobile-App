import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  Modal,
  TouchableHighlight,
  ToastAndroid,
  FlatList,
  Alert
} from 'react-native'
import GridLayout from 'react-native-layout-grid'
import Header from '../components/Header'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import update from 'react-addons-update'
import Bottom from '../components/Bottom'
import GridItem from '../components/GridItem'
import { toggleAreYouSureModalVisibility } from '../store/actions/barActions'

class Bar extends Component {
  constructor() {
    super()
  }

  placeOrder = () => {}

  // increaseNumberOfItemInCart = itemId => {
  //   const currentNoInCart = this.state.bar[3].noInCart
  //   const noInCart = Number(currentNoInCart) + 1
  //   this.setState({
  //     bar: update(this.state.bar, {
  //       3: { noInCart: { $set: `${noInCart}` } }
  //     })
  //   })
  // }

  renderGridItem = ({ item, index }) => <GridItem item={item} index={index} />

  setModalVisible = () => {
    this.props.setModalVisible(!this.props.areYouSureModalIsVisible)
  }

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

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.showConfirmationDialog()}
        <Header tab="Bar" screen="bar" />
        <View style={styles.layoutContainer}>
          <Text style={styles.layoutTitleText}>Bar</Text>
          <View style={styles.gridContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <FlatList
                data={this.props.bar}
                keyExtractor={item => item.itemId}
                renderItem={this.renderGridItem}
                horizontal={false}
                numColumns={2}
                style={styles.gridLayout}
              />
            </ScrollView>
            <Bottom />
          </View>
        </View>
      </View>
    )
  }
}

mapStateToProps = state => {
  return {
    bar: state.barReducer.bar,
    areYouSureModalIsVisible: state.barReducer.areYouSureModalIsVisible,
    barCart: state.barReducer.barCart
  }
}

mapDispatchToProps = dispatch => {
  return {
    setModalVisible: status => {
      dispatch(toggleAreYouSureModalVisibility(status))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bar)

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    marginTop: 5,
    backgroundColor: '#F5FCFF',
    paddingLeft: 5,
    paddingRight: 5
  },
  layoutTitleText: {
    fontSize: 17,
    marginTop: 7,
    marginBottom: 10,
    marginLeft: 10
  },
  gridContainer: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column'
  },
  gridLayout: {
    marginBottom: 30
  }
})
