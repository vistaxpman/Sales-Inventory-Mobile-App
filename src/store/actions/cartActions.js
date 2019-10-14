export const UPDATE_NO_OF_ITEM_IN_CART = 'UPDATE_NO_OF_ITEM_IN_CART'

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
