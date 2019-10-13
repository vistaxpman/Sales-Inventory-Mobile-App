export const UPDATE_NO_OF_ITEM_IN_RESTAURANT = 'UPDATE_NO_OF_ITEM_IN_RESTAURANT'
export const CLEAR_ITEMS_IN_RESTAURANT = 'CLEAR_ITEMS_IN_RESTAURANT'

export const updateNoOfItemInRestaurant = (value, item, index, eventType) => ({
  type: UPDATE_NO_OF_ITEM_IN_RESTAURANT,
  payload: { value, item, index, eventType }
})

export const clearItemsInRestaurant = () => ({
  type: CLEAR_ITEMS_IN_RESTAURANT
})
