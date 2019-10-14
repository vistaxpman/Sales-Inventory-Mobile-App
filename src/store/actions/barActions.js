export const UPDATE_NO_OF_ITEM_IN_BAR = 'UPDATE_NO_OF_ITEM_IN_BAR'
export const CLEAR_ITEMS_IN_BAR = 'CLEAR_ITEMS_IN_BAR'
export const UPDATE_NO_OF_ITEM_FOR_BAR_CHECKOUT =
  'UPDATE_NO_OF_ITEM_FOR_BAR_CHECKOUT'

export const updateNoOfItemInBar = (value, index) => ({
  type: UPDATE_NO_OF_ITEM_IN_BAR,
  payload: { value, index }
})

export const clearItemsInBar = () => ({
  type: CLEAR_ITEMS_IN_BAR
})

export const updateNoOfItemForBarCheckOut = (value, itemId) => ({
  type: UPDATE_NO_OF_ITEM_FOR_BAR_CHECKOUT,
  payload: { value, itemId }
})
