import * as Actions from '../actions'
import update from 'react-addons-update'

const initialState = {
  itemsInCart: [
    {
      transactionId: '112345678',
      tableNumber: '15',
      transactionTotalAmount: 0,
      transactionTotalNumberOfItems: 0,
      updatedTransactionTotalAmount: 0,
      updatedTransactionTotalNumberOfItems: 0,
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
      transactionId: '26376738',
      tableNumber: '18',
      transactionTotalAmount: 0,
      transactionTotalNumberOfItems: 0,
      updatedTransactionTotalAmount: 0,
      updatedTransactionTotalNumberOfItems: 0,
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
    case Actions.UPDATE_NO_OF_ITEM_IN_CART: {
      // const newTransactionNumberOfItems = Number(state.transactionNumberOfItems) + Number()
      // const newTransactionTotalAmount = Number(state.transactionTotalAmount)
      return update(state, {
        itemsInCart: {
          [action.payload.index]: {
            transactionDetails: {
              [action.payload.subIndex]: {
                noInCart: { $set: action.payload.value }
              }
            }
          }
        }
        // transactionTotalAmount: {$set: `${newTransactionTotalAmount}`}
      })
    }
    default: {
      return state
    }
  }
}

export default cartReducer
