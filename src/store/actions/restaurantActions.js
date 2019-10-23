export const UPDATE_NO_OF_ITEM_IN_RESTAURANT = 'UPDATE_NO_OF_ITEM_IN_RESTAURANT'
export const CLEAR_ITEMS_IN_RESTAURANT = 'CLEAR_ITEMS_IN_RESTAURANT'
export const UPDATE_NO_OF_ITEM_FOR_RESTAURANT_CHECKOUT =
  'UPDATE_NO_OF_ITEM_FOR_RESTAURANT_CHECKOUT'
export const FILTER_ITEMS_IN_RESTAURANT = 'FILTER_ITEMS_IN_RESTAURANT'
export const POPULATE_ITEMS_IN_RESTAURANT = 'POPULATE_ITEMS_IN_RESTAURANT'

export const updateNoOfItemInRestaurant = (value, index) => ({
  type: UPDATE_NO_OF_ITEM_IN_RESTAURANT,
  payload: { value, index }
})

export const clearItemsInRestaurant = () => ({
  type: CLEAR_ITEMS_IN_RESTAURANT
})

export const updateNoOfItemForRestaurantCheckOut = (value, itemId) => ({
  type: UPDATE_NO_OF_ITEM_FOR_RESTAURANT_CHECKOUT,
  payload: { value, itemId }
})

export const filterItemsInRestaurant = value => ({
  type: FILTER_ITEMS_IN_RESTAURANT,
  payload: { value }
})

export const populateItemsInRestaurant = value => ({
  type: POPULATE_ITEMS_IN_RESTAURANT,
  payload: value
})
