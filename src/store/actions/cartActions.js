export const UPDATE_NO_OF_ITEM_IN_CART = 'UPDATE_NO_OF_ITEM_IN_CART'
export const FILTER_TRANSACTIONS_IN_CART = 'FILTER_TRANSACTIONS_IN_CART'
export const ADD_NEW_DATA_TO_CART = 'ADD_NEW_DATA_TO_CART'
export const CANCEL_TRANSACTION_IN_CART = 'CANCEL_TRANSACTION_IN_CART'
export const POPULATE_ONGOING_TRANSACTIONS_IN_CART =
  'POPULATE_ONGOING_TRANSACTIONS_IN_CART'

export const updateNoOfItemInCart = (
  transactionId,
  itemId,
  index,
  value,
  subIndex
) => ({
  type: UPDATE_NO_OF_ITEM_IN_CART,
  payload: { transactionId, itemId, index, value, subIndex }
})

export const filterTransactionsInCart = value => ({
  type: FILTER_TRANSACTIONS_IN_CART,
  payload: { value }
})

export const addNewDataToCart = newItemsInCart => ({
  type: ADD_NEW_DATA_TO_CART,
  payload: newItemsInCart
})

export const cancelTransactionInCart = transactionId => ({
  type: CANCEL_TRANSACTION_IN_CART,
  payload: { transactionId }
})

export const populateOngoingTransactionsInCart = transactions => ({
  type: POPULATE_ONGOING_TRANSACTIONS_IN_CART,
  payload: transactions
})
