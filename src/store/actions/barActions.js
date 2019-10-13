export const UPDATE_NO_OF_ITEM_IN_BAR = 'UPDATE_NO_OF_ITEM_IN_BAR'
export const CLEAR_ITEMS_IN_BAR = 'CLEAR_ITEMS_IN_BAR'

export const updateNoOfItemInBar = (value, index) => ({
  type: UPDATE_NO_OF_ITEM_IN_BAR,
  payload: { value, index }
})

export const clearItemsInBar = () => ({
  type: CLEAR_ITEMS_IN_BAR
})
