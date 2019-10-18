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
          barCheckOut: [
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
            }
          ],
          restaurantCheckOut: [
            {
              itemId: '11345',
              name: 'Bitter Leaf Soup',
              category: 'soup',
              price: '300',
              isAddedToCart: false,
              noInCheckOut: 0,
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
              noInCheckOut: 0,
              image: {
                url:
                  'https://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/03/banga-soupaaa.jpg?resize=1024%2C682&ssl=1'
              }
            }
          ]
        },
        {
          barCheckOut: [
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
            }
          ],
          restaurantCheckOut: []
        }
      ]
    },
    {
      transactionId: '54323456',
      tableNumber: '18',
      transactionTotalAmount: 0,
      transactionTotalNumberOfItems: 0,
      updatedTransactionTotalAmount: 0,
      updatedTransactionTotalNumberOfItems: 0,
      transactionDetails: [
        {
          barCheckOut: [
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
            }
          ],
          restaurantCheckOut: [
            {
              itemId: '11345',
              name: 'Bitter Leaf Soup',
              category: 'soup',
              price: '300',
              isAddedToCart: false,
              noInCheckOut: 0,
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
              noInCheckOut: 0,
              image: {
                url:
                  'https://i1.wp.com/www.myactivekitchen.com/wp-content/uploads/2015/03/banga-soupaaa.jpg?resize=1024%2C682&ssl=1'
              }
            }
          ]
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
                noInCheckOut: { $set: action.payload.value }
              }
            }
          }
        }
        // transactionTotalAmount: {$set: `${newTransactionTotalAmount}`}
      })
    }
    case Actions.FILTER_TRANSACTIONS_IN_CART: {
      let newItemsInCart = []
      if (action.payload.value) {
        newItemsInCart = state.itemsInCartClone.filter(
          item =>
            item.tableNumber.includes(action.payload.value.toString()) ||
            item.transactionId.startsWith(action.payload.value.toString())
        )
      } else {
        newItemsInCart = state.itemsInCartClone
      }
      return update(state, {
        itemsInCart: {
          $set: newItemsInCart
        }
      })
    }
    case Actions.ADD_NEW_DATA_TO_CART: {
      const newItemsInCart = state.itemsInCartClone.concat(action.payload)
      return update(state, {
        itemsInCart: {
          $set: newItemsInCart
        },
        itemsInCartClone: {
          $set: newItemsInCart
        }
      })
    }
    case Actions.CANCEL_TRANSACTION_IN_CART: {
      const newItemsInCart = state.itemsInCartClone.filter(
        item => item.transactionId !== action.payload.transactionId
      )
      return update(state, {
        itemsInCart: {
          $set: newItemsInCart
        },
        itemsInCartClone: {
          $set: newItemsInCart
        }
      })
    }
    case Actions.POPULATE_ONGOING_TRANSACTIONS_IN_CART: {
      const newItemsInCart = state.itemsInCartClone.filter(
        item => item.transactionId !== action.payload.transactionId
      )
      return update(state, {
        itemsInCart: {
          $set: newItemsInCart
        },
        itemsInCartClone: {
          $set: newItemsInCart
        }
      })
    }
    default: {
      return state
    }
  }
}

export default cartReducer
