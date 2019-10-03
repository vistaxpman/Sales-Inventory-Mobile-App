import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Modal,
  TouchableHighlight,
  ToastAndroid
} from 'react-native'
import GridLayout from 'react-native-layout-grid'
import MyHeader from '../components/MyHeader'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FeatherIcon from 'react-native-vector-icons/Feather'
import EntypoIcon from 'react-native-vector-icons/Entypo'

export default class Bar extends Component {
  constructor() {
    super()
    this.state = {
      areYouSureModalIsVisible: false,
      bar: [
        {
          name: 'Star',
          category: 'beer',
          price: '300',
          isAddedToCart: true,
          image: {
            url:
              'https://produits.bienmanger.com/35133-0w345h345_Star_Lager_Beer_From_Nigeria.jpg'
          }
        },
        {
          name: 'Guiness',
          category: 'beer',
          price: '250',
          isAddedToCart: false,
          image: {
            url:
              'https://dydza6t6xitx6.cloudfront.net/ci-guinness-draught-57a370742d804361.png'
          }
        },
        {
          name: 'Budweiser',
          category: 'beer',
          price: '800',
          isAddedToCart: false,
          image: {
            url:
              'https://dydza6t6xitx6.cloudfront.net/ci-budweiser-9cda9582631c8c77.jpeg'
          }
        },
        {
          name: 'Vodka',
          category: 'spirit',
          price: '5000',
          isAddedToCart: false,
          image: {
            url:
              'https://media-verticommnetwork1.netdna-ssl.com/wines/absolut-vodka-45l-434781_p.jpg'
          }
        },
        {
          name: 'Star',
          category: 'beer',
          price: '300',
          isAddedToCart: false,
          image: {
            url:
              'https://produits.bienmanger.com/35133-0w345h345_Star_Lager_Beer_From_Nigeria.jpg'
          }
        },
        {
          name: 'Guiness',
          category: 'beer',
          price: '250',
          isAddedToCart: false,
          image: {
            url:
              'https://dydza6t6xitx6.cloudfront.net/ci-guinness-draught-57a370742d804361.png'
          }
        },
        {
          name: 'Budweiser',
          category: 'beer',
          price: '800',
          isAddedToCart: false,
          image: {
            url:
              'https://dydza6t6xitx6.cloudfront.net/ci-budweiser-9cda9582631c8c77.jpeg'
          }
        },
        {
          name: 'Vodka',
          category: 'spirit',
          price: '5000',
          isAddedToCart: false,
          image: {
            url:
              'https://media-verticommnetwork1.netdna-ssl.com/wines/absolut-vodka-45l-434781_p.jpg'
          }
        }
      ]
    }
  }

  setModalVisible = visible => {
    // this.setState({ areYouSureModalIsVisible: visible })
  }

  placeOrder = () => {
    // ToastAndroid.show(
    //   'Are you sure you want to place order ?',
    //   ToastAndroid.SHORT
    // )
  }

  renderGridItem = item => (
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <ImageBackground
          source={{ uri: item.image.url }}
          style={styles.itemBgImage}
          resizeMode="contain"
        >
          {item.isAddedToCart && (
            <View style={styles.itemBgCheckBoxContainer}>
              <AntDesignIcon name="checkcircleo" size={20} color="#eeaf3b" />
            </View>
          )}
        </ImageBackground>
        <View style={styles.itemAndPriceContainer}>
          <Text style={styles.itemNameText}>{item.name}</Text>
          <Text style={styles.itemPriceText}>{`#${item.price}`}</Text>
        </View>
        <View style={styles.counterContainer}>
          <EntypoIcon name="plus" size={20} color="#eeaf3b" />
          <Text style={styles.counterText}>0</Text>
          <EntypoIcon name="minus" size={20} color="#eeaf3b" />
        </View>
      </View>
    </TouchableOpacity>
  )

  render() {
    const items = []
    const length = this.state.bar.length
    for (let x = 0; x < length; x++) {
      items.push({
        name: `Grid ${x}`
      })
    }

    return (
      <View style={{ flex: 1 }}>
        {/* <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.areYouSureModalIsVisible)
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal> */}
        <MyHeader tab="Bar" />
        <View style={styles.layoutContainer}>
          <Text style={styles.welcome}>Bar</Text>
          <View style={styles.gridContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <GridLayout
                items={this.state.bar}
                itemsPerRow={2}
                renderItem={this.renderGridItem}
                style={styles.gridLayout}
              />
            </ScrollView>
            <View title="Place Order" style={styles.bottomContainer}>
              <View style={styles.noOfItemsContainer}>
                <Text style={styles.noOfItemsTextOne}>4</Text>
                <Text style={styles.noOfItemsTextTwo}>Items</Text>
              </View>
              <View style={styles.totalAmountContainer}>
                <Text style={styles.totalAmountTextOne}>Total Amount:</Text>
                <Text style={styles.totalAmountTextTwo}>#3500</Text>
              </View>
              <TouchableOpacity onPress={this.setModalVisible(true)}>
                <View style={styles.placeOrderContainer}>
                  <FeatherIcon name="send" size={30} color="#fff" />
                  <Text style={styles.placeOrderText}>Place Order</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    marginTop: 5,
    backgroundColor: '#F5FCFF',
    paddingLeft: 5,
    paddingRight: 5
  },
  welcome: {
    fontSize: 17,
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 10
  },
  gridContainer: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column'
  },
  gridLayout: {
    marginBottom: 30
  },
  itemContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    margin: 5,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
    padding: 5
  },
  itemBgImage: {
    width: '100%',
    height: 80
  },
  itemBgCheckBoxContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  itemAndPriceContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  itemNameText: {
    fontWeight: 'bold',
    fontSize: 15
  },
  itemPriceText: {
    color: 'gray'
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7
  },
  counterText: {
    fontSize: 17
  },
  bottomContainer: {
    alignSelf: 'flex-end',
    height: 50,
    marginBottom: 7,
    backgroundColor: '#eeaf3b',
    borderColor: '#eeaf3b',
    borderWidth: 1,
    borderRadius: 3,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2
  },
  noOfItemsContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  noOfItemsTextOne: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
    textAlign: 'center'
  },
  noOfItemsTextTwo: {
    fontWeight: 'bold',
    color: '#fff'
  },
  totalAmountContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  totalAmountTextOne: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff'
  },
  totalAmountTextTwo: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  placeOrderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  placeOrderText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#fff'
  }
})
