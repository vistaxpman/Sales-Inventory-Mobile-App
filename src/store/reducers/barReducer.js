import * as Actions from '../actions'

import update from 'react-addons-update'

const initialState = {
  totalNumberOfItemsAddedFromBar: 0,
  totalAmountOfItemsAddedFromBar: 0,
  bar: [
    {
      itemId: '12345',
      name: 'Star',
      category: 'beer',
      price: '300',
      isAddedToCart: true,
      noInCart: 0,
      image: {
        url:
          'https://produits.bienmanger.com/35133-0w345h345_Star_Lager_Beer_From_Nigeria.jpg'
      }
    },
    {
      itemId: '23456',
      name: 'Guiness',
      category: 'beer',
      price: '250',
      isAddedToCart: false,
      noInCart: 0,
      image: {
        url:
          'https://dydza6t6xitx6.cloudfront.net/ci-guinness-draught-57a370742d804361.png'
      }
    },
    {
      itemId: '34567',
      name: 'Budweiser',
      category: 'beer',
      price: '800',
      isAddedToCart: false,
      noInCart: 0,
      image: {
        url:
          'https://dydza6t6xitx6.cloudfront.net/ci-budweiser-9cda9582631c8c77.jpeg'
      }
    },
    {
      itemId: '45678',
      name: 'Vodka',
      category: 'spirit',
      price: '5000',
      isAddedToCart: false,
      noInCart: 0,
      image: {
        url:
          'https://media-verticommnetwork1.netdna-ssl.com/wines/absolut-vodka-45l-434781_p.jpg'
      }
    },
    {
      itemId: '56789',
      name: 'Star',
      category: 'beer',
      price: '300',
      isAddedToCart: false,
      noInCart: 0,
      image: {
        url:
          'https://produits.bienmanger.com/35133-0w345h345_Star_Lager_Beer_From_Nigeria.jpg'
      }
    },
    {
      itemId: '678910',
      name: 'Guiness',
      category: 'beer',
      price: '250',
      isAddedToCart: false,
      noInCart: 0,
      image: {
        url:
          'https://dydza6t6xitx6.cloudfront.net/ci-guinness-draught-57a370742d804361.png'
      }
    },
    {
      itemId: '7891011',
      name: 'Budweiser',
      category: 'beer',
      price: '800',
      isAddedToCart: false,
      noInCart: 0,
      image: {
        url:
          'https://dydza6t6xitx6.cloudfront.net/ci-budweiser-9cda9582631c8c77.jpeg'
      }
    },
    {
      itemId: '7891012',
      name: 'Vodka',
      category: 'spirit',
      price: '5000',
      isAddedToCart: false,
      noInCart: 0,
      image: {
        url:
          'https://media-verticommnetwork1.netdna-ssl.com/wines/absolut-vodka-45l-434781_p.jpg'
      }
    }
  ],
  barCart: []
}

const barReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_ITEM_TO_BAR: {
      const itemIndex = action.payload.index
      const noInCart = state.bar[itemIndex].noInCart
      const increaseNoInCart = Number(noInCart) + 1
      const totalNumberOfItemsAddedFromBar =
        state.totalNumberOfItemsAddedFromBar
      const increaseTotalNumberOfItemsAddedFromBar =
        Number(totalNumberOfItemsAddedFromBar) + 1
      const itemPrice = state.bar[itemIndex].price
      const currentTotalAmount = state.totalAmountOfItemsAddedFromBar
      const increaseTotalAmountOfItemsAddedFromBar =
        Number(itemPrice) + Number(currentTotalAmount)
      // const item = action.payload.item
      const newBar = state.bar.map((item, index) => {
        if (index === itemIndex) {
          item.noInCart = increaseNoInCart
        }
        return item
      })

      const newBarCart = () => {
        return newBar.filter(item => item.noInCart > 0)
      }

      return update(state, {
        bar: {
          [itemIndex]: {
            noInCart: { $set: `${increaseNoInCart}` }
          }
        },
        totalNumberOfItemsAddedFromBar: {
          $set: `${increaseTotalNumberOfItemsAddedFromBar}`
        },
        totalAmountOfItemsAddedFromBar: {
          $set: `${increaseTotalAmountOfItemsAddedFromBar}`
        },
        barCart: { $set: newBarCart() }
      })
    }
    case Actions.REMOVE_ITEM_FROM_BAR: {
      const itemIndex = action.payload.index
      const noInCart = state.bar[itemIndex].noInCart

      if (noInCart > 0) {
        const decreaseNoInCart = Number(noInCart) - 1

        const totalNumberOfItemsAddedFromBar =
          state.totalNumberOfItemsAddedFromBar
        const decreaseTotalNumberOfItemsAddedFromBar =
          Number(totalNumberOfItemsAddedFromBar) - 1
        const itemPrice = state.bar[itemIndex].price
        const currentTotalAmount = state.totalAmountOfItemsAddedFromBar
        const decreaseTotalAmountOfItemsAddedFromBar =
          Number(currentTotalAmount) - Number(itemPrice)

        const newBar = state.bar.map((item, index) => {
          if (index === itemIndex) {
            item.noInCart = decreaseNoInCart
          }
          return item
        })

        const newBarCart = () => {
          return newBar.filter(item => item.noInCart > 0)
        }
        return update(state, {
          bar: {
            [itemIndex]: {
              noInCart: { $set: `${decreaseNoInCart}` }
            }
          },
          totalNumberOfItemsAddedFromBar: {
            $set: `${decreaseTotalNumberOfItemsAddedFromBar}`
          },
          totalAmountOfItemsAddedFromBar: {
            $set: `${decreaseTotalAmountOfItemsAddedFromBar}`
          },
          barCart: { $set: newBarCart() }
        })
      }
    }
    case Actions.EDIT_NO_OF_ITEM_IN_BAR: {
      const itemIndex = action.payload.index
      const userInput = action.payload.userInput
      const formerNumberOfItemsAdded = state.bar[itemIndex].noInCart
      const itemPrice = state.bar[itemIndex].price
      let currentTotalNumberOfItemsAddedFromBar =
        state.totalNumberOfItemsAddedFromBar
      let currentTotalAmountOfItemsAddedFromBar =
        state.totalAmountOfItemsAddedFromBar
      if (formerNumberOfItemsAdded > 0) {
        currentTotalNumberOfItemsAddedFromBar =
          Number(currentTotalNumberOfItemsAddedFromBar) -
          Number(formerNumberOfItemsAdded)
        const priceOfFormerNumberOfItemsAdded =
          Number(formerNumberOfItemsAdded) * itemPrice
        currentTotalAmountOfItemsAddedFromBar =
          Number(currentTotalAmountOfItemsAddedFromBar) -
          priceOfFormerNumberOfItemsAdded
      }
      currentTotalNumberOfItemsAddedFromBar =
        Number(currentTotalNumberOfItemsAddedFromBar) + Number(userInput)
      const priceOfUserInput = Number(userInput) * itemPrice
      currentTotalAmountOfItemsAddedFromBar =
        Number(currentTotalAmountOfItemsAddedFromBar) + priceOfUserInput

      const newBar = state.bar.map((item, index) => {
        if (index === itemIndex) {
          item.noInCart = userInput
        }
        return item
      })

      const newBarCart = () => {
        return newBar.filter(item => item.noInCart > 0)
      }

      return update(state, {
        bar: {
          [itemIndex]: {
            noInCart: { $set: `${userInput}` }
          }
        },
        totalNumberOfItemsAddedFromBar: {
          $set: `${currentTotalNumberOfItemsAddedFromBar}`
        },
        totalAmountOfItemsAddedFromBar: {
          $set: `${currentTotalAmountOfItemsAddedFromBar}`
        },
        barCart: { $set: newBarCart() }
      })
    }
    default: {
      return state
    }
  }
}

export default barReducer
