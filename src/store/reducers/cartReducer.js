import * as Actions from '../actions'

const initialState = {
  itemsInCart: [
    {
      transactionId: '#112345678',
      transactionDetails: [
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
        }
      ]
    },
    {
      transactionId: '#26376738',
      transactionDetails: [
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
        }
      ]
    }
  ]
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.INCREASE_NO_IN_CART: {
      return {
        ...state
      }
    }
    default: {
      return state
    }
  }
}

export default cartReducer
