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
      noInCheckOut: 0,
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
      noInCheckOut: 0,
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
      noInCheckOut: 0,
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
      noInCheckOut: 0,
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
      noInCheckOut: 0,
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
      noInCheckOut: 0,
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
      noInCheckOut: 0,
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
      noInCheckOut: 0,
      image: {
        url:
          'https://media-verticommnetwork1.netdna-ssl.com/wines/absolut-vodka-45l-434781_p.jpg'
      }
    }
  ],
  barCheckOut: []
}

const barReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.UPDATE_NO_OF_ITEM_IN_BAR: {
      const newBar = state.bar.map((item, index) => {
        if (index === action.payload.index) {
          item.noInCheckOut = action.payload.value
        }
        return item
      })

      const newBarCheckOut = () => {
        return newBar.filter(item => item.noInCheckOut > 0)
      }

      let newTotalNumberOfItemsAddedFromBar = 0
      let newTotalAmountOfItemsAddedFromBar = 0
      newBar.map((anItem, index) => {
        newTotalNumberOfItemsAddedFromBar += Number(anItem.noInCheckOut)
        if (anItem.noInCheckOut > 0) {
          newTotalAmountOfItemsAddedFromBar +=
            Number(anItem.price) * Number(anItem.noInCheckOut)
        }
      })

      return update(state, {
        bar: {
          [action.payload.index]: {
            noInCheckOut: { $set: action.payload.value }
          }
        },
        totalNumberOfItemsAddedFromBar: {
          $set: `${newTotalNumberOfItemsAddedFromBar}`
        },
        totalAmountOfItemsAddedFromBar: {
          $set: `${newTotalAmountOfItemsAddedFromBar}`
        },
        barCheckOut: { $set: newBarCheckOut() }
      })
    }
    case Actions.CLEAR_ITEMS_IN_BAR: {
      const newBar = state.bar.map((item, index) => {
        item.noInCheckOut = 0
        return item
      })

      return {
        ...state,
        bar: newBar,
        totalNumberOfItemsAddedFromBar: 0,
        totalAmountOfItemsAddedFromBar: 0,
        barCheckOut: []
      }
    }
    default: {
      return state
    }
  }
}

export default barReducer
