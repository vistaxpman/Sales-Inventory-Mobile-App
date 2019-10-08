import * as Actions from '../actions'

import update from 'react-addons-update'

const initialState = {
  totalNumberOfItemsAddedFromRestaurant: 0,
  totalAmountOfItemsAddedFromRestaurant: 0,
  restaurant: [
    {
      itemId: '11345',
      name: 'Bitter Leaf Soup',
      category: 'soup',
      price: '300',
      isAddedToCart: true,
      noInCart: 0,
      image: {
        url:
          'https://sisijemimah.com/wp-content/uploads/2016/04/bitter-leaf-soup-12.jpg'
      }
    },
    {
      itemId: '22456',
      name: 'Banga Soup',
      category: 'soup',
      price: '250',
      isAddedToCart: false,
      noInCart: 0,
      image: {
        url:
          'https://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/03/banga-soupaaa.jpg?resize=1024%2C682&ssl=1'
      }
    },
    {
      itemId: '33567',
      name: 'Meat Pepper Soup',
      category: 'soup',
      price: '800',
      isAddedToCart: false,
      noInCart: 0,
      image: {
        url:
          'https://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/03/assorted-meat-nigerian-pepper-soup-img-7.jpg?resize=380%2C380&ssl=1'
      }
    },
    {
      itemId: '44678',
      name: 'Beef Stew',
      category: 'stew',
      price: '5000',
      isAddedToCart: false,
      noInCart: 0,
      image: {
        url:
          'https://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2019/05/nigerian-beef-stew_image_13.jpg?resize=360%2C240&ssl=1'
      }
    },
    {
      itemId: '55789',
      name: 'Egusi Soup',
      category: 'soup',
      price: '300',
      isAddedToCart: false,
      noInCart: 0,
      image: {
        url:
          'https://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2019/02/Egusi-soup.image-3-600x900-e1549493434779.jpeg?zoom=2&resize=360%2C240&ssl=1://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2019/02/Egusi-soup.image-3-600x900-e1549493434779.jpeg'
      }
    },
    {
      itemId: '668910',
      name: 'Chicken Stew',
      category: 'stew',
      price: '250',
      isAddedToCart: false,
      noInCart: 0,
      image: {
        url:
          'https://i2.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/03/nigerian-chicken-stew_jpg-1-e1548367805864.jpeg?zoom=2&resize=360%2C240&ssl=1://i2.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/03/nigerian-chicken-stew_jpg-1-e1548367805864.jpeg'
      }
    },
    {
      itemId: '7791011',
      name: 'Edikang Ikong',
      category: 'soup',
      price: '800',
      isAddedToCart: false,
      noInCart: 0,
      image: {
        url:
          'https://i2.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/11/edikA-e1554940545349.jpg?resize=360%2C240&ssl=1'
      }
    }
  ],
  restaurantCart: []
}

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_ITEM_TO_RESTAURANT: {
      const itemIndex = action.payload.index
      const noInCart = state.restaurant[itemIndex].noInCart
      const increaseNoInCart = Number(noInCart) + 1
      const totalNumberOfItemsAddedFromRestaurant =
        state.totalNumberOfItemsAddedFromRestaurant
      const increaseTotalNumberOfItemsAddedFromRestaurant =
        Number(totalNumberOfItemsAddedFromRestaurant) + 1
      const itemPrice = state.restaurant[itemIndex].price
      const currentTotalAmount = state.totalAmountOfItemsAddedFromRestaurant
      const increaseTotalAmountOfItemsAddedFromRestaurant =
        Number(itemPrice) + Number(currentTotalAmount)
      // const item = action.payload.item
      const newRestaurant = state.restaurant.map((item, index) => {
        if (index === itemIndex) {
          item.noInCart = increaseNoInCart
        }
        return item
      })

      const newRestaurantCart = () => {
        return newRestaurant.filter(item => item.noInCart > 0)
      }

      return update(state, {
        restaurant: {
          [itemIndex]: {
            noInCart: { $set: `${increaseNoInCart}` }
          }
        },
        totalNumberOfItemsAddedFromRestaurant: {
          $set: `${increaseTotalNumberOfItemsAddedFromRestaurant}`
        },
        totalAmountOfItemsAddedFromRestaurant: {
          $set: `${increaseTotalAmountOfItemsAddedFromRestaurant}`
        },
        restaurantCart: { $set: newRestaurantCart() }
      })
    }
    case Actions.REMOVE_ITEM_FROM_RESTAURANT: {
      const itemIndex = action.payload.index
      const noInCart = state.restaurant[itemIndex].noInCart

      if (noInCart > 0) {
        const decreaseNoInCart = Number(noInCart) - 1

        const totalNumberOfItemsAddedFromRestaurant =
          state.totalNumberOfItemsAddedFromRestaurant
        const decreaseTotalNumberOfItemsAddedFromRestaurant =
          Number(totalNumberOfItemsAddedFromRestaurant) - 1
        const itemPrice = state.restaurant[itemIndex].price
        const currentTotalAmount = state.totalAmountOfItemsAddedFromRestaurant
        const decreaseTotalAmountOfItemsAddedFromRestaurant =
          Number(currentTotalAmount) - Number(itemPrice)

        const newRestaurant = state.restaurant.map((item, index) => {
          if (index === itemIndex) {
            item.noInCart = decreaseNoInCart
          }
          return item
        })

        const newRestaurantCart = () => {
          return newRestaurant.filter(item => item.noInCart > 0)
        }
        return update(state, {
          restaurant: {
            [itemIndex]: {
              noInCart: { $set: `${decreaseNoInCart}` }
            }
          },
          totalNumberOfItemsAddedFromRestaurant: {
            $set: `${decreaseTotalNumberOfItemsAddedFromRestaurant}`
          },
          totalAmountOfItemsAddedFromRestaurant: {
            $set: `${decreaseTotalAmountOfItemsAddedFromRestaurant}`
          },
          restaurantCart: { $set: newRestaurantCart() }
        })
      }
    }
    case Actions.EDIT_NO_OF_ITEM_IN_RESTAURANT: {
      const itemIndex = action.payload.index
      const userInput = action.payload.userInput
      const formerNumberOfItemsAdded = state.restaurant[itemIndex].noInCart
      const itemPrice = state.restaurant[itemIndex].price
      let currentTotalNumberOfItemsAddedFromRestaurant =
        state.totalNumberOfItemsAddedFromRestaurant
      let currentTotalAmountOfItemsAddedFromRestaurant =
        state.totalAmountOfItemsAddedFromRestaurant
      if (formerNumberOfItemsAdded > 0) {
        currentTotalNumberOfItemsAddedFromRestaurant =
          Number(currentTotalNumberOfItemsAddedFromRestaurant) -
          Number(formerNumberOfItemsAdded)
        const priceOfFormerNumberOfItemsAdded =
          Number(formerNumberOfItemsAdded) * itemPrice
        currentTotalAmountOfItemsAddedFromRestaurant =
          Number(currentTotalAmountOfItemsAddedFromRestaurant) -
          priceOfFormerNumberOfItemsAdded
      }
      currentTotalNumberOfItemsAddedFromRestaurant =
        Number(currentTotalNumberOfItemsAddedFromRestaurant) + Number(userInput)
      const priceOfUserInput = Number(userInput) * itemPrice
      currentTotalAmountOfItemsAddedFromRestaurant =
        Number(currentTotalAmountOfItemsAddedFromRestaurant) + priceOfUserInput

      const newRestaurant = state.restaurant.map((item, index) => {
        if (index === itemIndex) {
          item.noInCart = userInput
        }
        return item
      })

      const newRestaurantCart = () => {
        return newRestaurant.filter(item => item.noInCart > 0)
      }

      return update(state, {
        restaurant: {
          [itemIndex]: {
            noInCart: { $set: `${userInput}` }
          }
        },
        totalNumberOfItemsAddedFromRestaurant: {
          $set: `${currentTotalNumberOfItemsAddedFromRestaurant}`
        },
        totalAmountOfItemsAddedFromRestaurant: {
          $set: `${currentTotalAmountOfItemsAddedFromRestaurant}`
        },
        restaurantCart: { $set: newRestaurantCart() }
      })
    }
    default: {
      return state
    }
  }
}

export default restaurantReducer
