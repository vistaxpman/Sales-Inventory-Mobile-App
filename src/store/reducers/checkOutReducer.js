import * as Actions from '../actions'

const initialState = {
  transactionId: '#112345678',
  transactionDetails: [
    // {
    //   itemId: '12345',
    //   name: 'Star',
    //   category: 'beer',
    //   price: '300',
    //   isAddedToCheckOut: true,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://produits.bienmanger.com/35133-0w345h345_Star_Lager_Beer_From_Nigeria.jpg'
    //   }
    // },
    // {
    //   itemId: '23456',
    //   name: 'Guiness',
    //   category: 'beer',
    //   price: '250',
    //   isAddedToCheckOut: false,
    //   noInCheckOut: 0,
    //   image: {
    //     url:
    //       'https://dydza6t6xitx6.cloudfront.net/ci-guinness-draught-57a370742d804361.png'
    //   }
    // }
  ]
}

const checkOutReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.INCREASE_NO_IN_CHECKOUT: {
      return {
        ...state
      }
    }
    default: {
      return state
    }
  }
}

export default checkOutReducer
