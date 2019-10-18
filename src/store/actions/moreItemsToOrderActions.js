export const UPDATE_NO_OF_ITEM_IN_MORE_BAR = 'UPDATE_NO_OF_ITEM_IN_MORE_BAR'
export const CLEAR_ITEMS_IN_MORE_BAR = 'CLEAR_ITEMS_IN_MORE_BAR'
export const UPDATE_NO_OF_ITEM_IN_MORE_RESTAURANT =
  'UPDATE_NO_OF_ITEM_IN_MORE_RESTAURANT'
export const CLEAR_ITEMS_IN_MORE_RESTAURANT = 'CLEAR_ITEMS_IN_MORE_RESTAURANT'

export const updateNoOfItemInMoreBar = (value, index) => ({
  type: UPDATE_NO_OF_ITEM_IN_MORE_BAR,
  payload: { value, index }
})

export const clearItemsInMoreBar = () => ({
  type: CLEAR_ITEMS_IN_MORE_BAR
})

export const updateNoOfItemInMoreRestaurant = (value, index) => ({
  type: UPDATE_NO_OF_ITEM_IN_MORE_RESTAURANT,
  payload: { value, index }
})

export const clearItemsInMoreRestaurant = () => ({
  type: CLEAR_ITEMS_IN_MORE_RESTAURANT
})
