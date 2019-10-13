export const UPDATE_NO_OF_ITEM_IN_BAR = 'UPDATE_NO_OF_ITEM_IN_BAR'
export const CLEAR_ITEMS_IN_BAR = 'CLEAR_ITEMS_IN_BAR'

export const updateNoOfItemInBar = (value, item, index, eventType) => ({
  type: UPDATE_NO_OF_ITEM_IN_BAR,
  payload: { value, item, index, eventType }
})

export const clearItemsInBar = () => ({
  type: CLEAR_ITEMS_IN_BAR
})
