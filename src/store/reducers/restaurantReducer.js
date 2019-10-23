import * as Actions from '../actions'

import update from 'react-addons-update'

const initialState = {
  totalNumberOfItemsAddedFromRestaurant: 0,
  totalAmountOfItemsAddedFromRestaurant: 0,
  restaurant: [
    // {
    //   itemId: '11345',
    //   name: 'Bitter Leaf Soup',
    //   category: 'soup',
    //   price: '300',
    //   isAddedToCart: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://sisijemimah.com/wp-content/uploads/2016/04/bitter-leaf-soup-12.jpg'
    //   }
    // },
    // {
    //   itemId: '22456',
    //   name: 'Banga Soup',
    //   category: 'soup',
    //   price: '250',
    //   isAddedToCart: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/03/banga-soupaaa.jpg?resize=1024%2C682&ssl=1'
    //   }
    // },
    // {
    //   itemId: '33567',
    //   name: 'Meat Pepper Soup',
    //   category: 'soup',
    //   price: '800',
    //   isAddedToCart: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/03/assorted-meat-nigerian-pepper-soup-img-7.jpg?resize=380%2C380&ssl=1'
    //   }
    // },
    // {
    //   itemId: '44678',
    //   name: 'Beef Stew',
    //   category: 'stew',
    //   price: '5000',
    //   isAddedToCart: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2019/05/nigerian-beef-stew_image_13.jpg?resize=360%2C240&ssl=1'
    //   }
    // },
    // {
    //   itemId: '55789',
    //   name: 'Egusi Soup',
    //   category: 'soup',
    //   price: '300',
    //   isAddedToCart: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2019/02/Egusi-soup.image-3-600x900-e1549493434779.jpeg?zoom=2&resize=360%2C240&ssl=1://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2019/02/Egusi-soup.image-3-600x900-e1549493434779.jpeg'
    //   }
    // },
    // {
    //   itemId: '668910',
    //   name: 'Chicken Stew',
    //   category: 'stew',
    //   price: '250',
    //   isAddedToCart: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://i2.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/03/nigerian-chicken-stew_jpg-1-e1548367805864.jpeg?zoom=2&resize=360%2C240&ssl=1://i2.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/03/nigerian-chicken-stew_jpg-1-e1548367805864.jpeg'
    //   }
    // },
    // {
    //   itemId: '7791011',
    //   name: 'Edikang Ikong',
    //   category: 'soup',
    //   price: '800',
    //   isAddedToCart: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://i2.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/11/edikA-e1554940545349.jpg?resize=360%2C240&ssl=1'
    //   }
    // }
  ],
  restaurantClone: [
    // {
    //   itemId: '11345',
    //   name: 'Bitter Leaf Soup',
    //   category: 'soup',
    //   price: '300',
    //   isAddedToCart: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://sisijemimah.com/wp-content/uploads/2016/04/bitter-leaf-soup-12.jpg'
    //   }
    // },
    // {
    //   itemId: '22456',
    //   name: 'Banga Soup',
    //   category: 'soup',
    //   price: '250',
    //   isAddedToCart: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/03/banga-soupaaa.jpg?resize=1024%2C682&ssl=1'
    //   }
    // },
    // {
    //   itemId: '33567',
    //   name: 'Meat Pepper Soup',
    //   category: 'soup',
    //   price: '800',
    //   isAddedToCart: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/03/assorted-meat-nigerian-pepper-soup-img-7.jpg?resize=380%2C380&ssl=1'
    //   }
    // },
    // {
    //   itemId: '44678',
    //   name: 'Beef Stew',
    //   category: 'stew',
    //   price: '5000',
    //   isAddedToCart: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2019/05/nigerian-beef-stew_image_13.jpg?resize=360%2C240&ssl=1'
    //   }
    // },
    // {
    //   itemId: '55789',
    //   name: 'Egusi Soup',
    //   category: 'soup',
    //   price: '300',
    //   isAddedToCart: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2019/02/Egusi-soup.image-3-600x900-e1549493434779.jpeg?zoom=2&resize=360%2C240&ssl=1://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2019/02/Egusi-soup.image-3-600x900-e1549493434779.jpeg'
    //   }
    // },
    // {
    //   itemId: '668910',
    //   name: 'Chicken Stew',
    //   category: 'stew',
    //   price: '250',
    //   isAddedToCart: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://i2.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/03/nigerian-chicken-stew_jpg-1-e1548367805864.jpeg?zoom=2&resize=360%2C240&ssl=1://i2.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/03/nigerian-chicken-stew_jpg-1-e1548367805864.jpeg'
    //   }
    // },
    // {
    //   itemId: '7791011',
    //   name: 'Edikang Ikong',
    //   category: 'soup',
    //   price: '800',
    //   isAddedToCart: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://i2.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/11/edikA-e1554940545349.jpg?resize=360%2C240&ssl=1'
    //   }
    // }
  ],
  restaurantCheckOut: []
}

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.UPDATE_NO_OF_ITEM_IN_RESTAURANT: {
      const newRestaurant = state.restaurant.map((item, index) => {
        if (index === action.payload.index) {
          item.noInCheckOut = action.payload.value
        }
        return item
      })

      const newRestaurantCheckOut = () => {
        return newRestaurant.filter(item => item.noInCheckOut > 0)
      }

      let newTotalNumberOfItemsAddedFromRestaurant = 0
      let newTotalAmountOfItemsAddedFromRestaurant = 0
      newRestaurant.map((anItem, index) => {
        newTotalNumberOfItemsAddedFromRestaurant += Number(anItem.noInCheckOut)
        if (anItem.noInCheckOut > 0) {
          newTotalAmountOfItemsAddedFromRestaurant +=
            Number(anItem.price) * Number(anItem.noInCheckOut)
        }
      })

      return update(state, {
        restaurant: {
          [action.payload.index]: {
            noInCheckOut: { $set: action.payload.value }
          }
        },
        totalNumberOfItemsAddedFromRestaurant: {
          $set: newTotalNumberOfItemsAddedFromRestaurant
        },
        totalAmountOfItemsAddedFromRestaurant: {
          $set: newTotalAmountOfItemsAddedFromRestaurant
        },
        restaurantCheckOut: { $set: newRestaurantCheckOut() }
      })
    }
    case Actions.CLEAR_ITEMS_IN_RESTAURANT: {
      const newRestaurant = state.restaurant.map(item => {
        item.noInCheckOut = 0
        return item
      })
      return {
        ...state,
        restaurant: newRestaurant,
        totalNumberOfItemsAddedFromRestaurant: 0,
        totalAmountOfItemsAddedFromRestaurant: 0,
        restaurantCheckOut: []
      }
    }
    case Actions.UPDATE_NO_OF_ITEM_FOR_RESTAURANT_CHECKOUT: {
      let itemIndex = ''
      const newRestaurant = state.restaurant.map((item, index) => {
        if (item.itemId === action.payload.itemId) {
          item.noInCheckOut = action.payload.value
          itemIndex = index
        }
        return item
      })

      const newRestaurantCheckOut = () => {
        return newRestaurant.filter(item => item.noInCheckOut > 0)
      }

      let newTotalNumberOfItemsAddedFromRestaurant = 0
      let newTotalAmountOfItemsAddedFromRestaurant = 0
      newRestaurant.map((anItem, index) => {
        newTotalNumberOfItemsAddedFromRestaurant += Number(anItem.noInCheckOut)
        if (anItem.noInCheckOut > 0) {
          newTotalAmountOfItemsAddedFromRestaurant +=
            Number(anItem.price) * Number(anItem.noInCheckOut)
        }
      })

      return update(state, {
        restaurant: {
          [itemIndex]: {
            noInCheckOut: { $set: action.payload.value }
          }
        },
        totalNumberOfItemsAddedFromRestaurant: {
          $set: newTotalNumberOfItemsAddedFromRestaurant
        },
        totalAmountOfItemsAddedFromRestaurant: {
          $set: newTotalAmountOfItemsAddedFromRestaurant
        },
        restaurantCheckOut: { $set: newRestaurantCheckOut() }
      })
    }
    case Actions.FILTER_ITEMS_IN_RESTAURANT: {
      let newRestaurant = []
      if (action.payload.value) {
        newRestaurant = state.restaurantClone.filter(item =>
          item.name.toLowerCase().includes(action.payload.value.toLowerCase())
        )
      } else {
        newRestaurant = state.restaurantClone
      }

      return update(state, {
        restaurant: {
          $set: newRestaurant
        }
      })
    }
    case Actions.POPULATE_ITEMS_IN_RESTAURANT: {
      return {
        ...state,
        restaurant: action.payload,
        restaurantClone: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default restaurantReducer
