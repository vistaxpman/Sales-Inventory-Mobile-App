import * as Actions from '../actions'

import update from 'react-addons-update'

const initialState = {
  areYouSureModalIsVisible: false,
  totalNumberOfItemsAdded: 0,
  totalAmountOfItemsAdded: 0,
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
    case Actions.ADD_ITEM: {
      const itemIndex = action.payload.index
      const noInCart = state.bar[itemIndex].noInCart
      const increaseNoInCart = Number(noInCart) + 1
      const totalNumberOfItemsAdded = state.totalNumberOfItemsAdded
      const increaseTotalNumberOfItemsAdded =
        Number(totalNumberOfItemsAdded) + 1
      const itemPrice = state.bar[itemIndex].price
      const currentTotalAmount = state.totalAmountOfItemsAdded
      const increaseTotalAmountOfItemsAdded =
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
        totalNumberOfItemsAdded: { $set: `${increaseTotalNumberOfItemsAdded}` },
        totalAmountOfItemsAdded: { $set: `${increaseTotalAmountOfItemsAdded}` },
        barCart: { $set: newBarCart() }
      })
    }
    case Actions.REMOVE_ITEM: {
      const itemIndex = action.payload.index
      const noInCart = state.bar[itemIndex].noInCart

      if (noInCart > 0) {
        const decreaseNoInCart = Number(noInCart) - 1

        const totalNumberOfItemsAdded = state.totalNumberOfItemsAdded
        const decreaseTotalNumberOfItemsAdded =
          Number(totalNumberOfItemsAdded) - 1
        const itemPrice = state.bar[itemIndex].price
        const currentTotalAmount = state.totalAmountOfItemsAdded
        const decreaseTotalAmountOfItemsAdded =
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
          totalNumberOfItemsAdded: {
            $set: `${decreaseTotalNumberOfItemsAdded}`
          },
          totalAmountOfItemsAdded: {
            $set: `${decreaseTotalAmountOfItemsAdded}`
          },
          barCart: { $set: newBarCart() }
        })
      }
    }
    case Actions.EDIT_NO_OF_ITEM: {
      const itemIndex = action.payload.index
      const userInput = action.payload.userInput
      const formerNumberOfItemsAdded = state.bar[itemIndex].noInCart
      const itemPrice = state.bar[itemIndex].price
      let currentTotalNumberOfItemsAdded = state.totalNumberOfItemsAdded
      let currentTotalAmountOfItemsAdded = state.totalAmountOfItemsAdded
      if (formerNumberOfItemsAdded > 0) {
        currentTotalNumberOfItemsAdded =
          Number(currentTotalNumberOfItemsAdded) -
          Number(formerNumberOfItemsAdded)
        const priceOfFormerNumberOfItemsAdded =
          Number(formerNumberOfItemsAdded) * itemPrice
        currentTotalAmountOfItemsAdded =
          Number(currentTotalAmountOfItemsAdded) -
          priceOfFormerNumberOfItemsAdded
      }
      currentTotalNumberOfItemsAdded =
        Number(currentTotalNumberOfItemsAdded) + Number(userInput)
      const priceOfUserInput = Number(userInput) * itemPrice
      currentTotalAmountOfItemsAdded =
        Number(currentTotalAmountOfItemsAdded) + priceOfUserInput

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
        totalNumberOfItemsAdded: {
          $set: `${currentTotalNumberOfItemsAdded}`
        },
        totalAmountOfItemsAdded: {
          $set: `${currentTotalAmountOfItemsAdded}`
        },
        barCart: { $set: newBarCart() }
      })
    }
    case Actions.TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY: {
      return {
        ...state,
        areYouSureModalIsVisible: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default barReducer
