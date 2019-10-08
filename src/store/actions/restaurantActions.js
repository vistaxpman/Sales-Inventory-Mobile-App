export const ADD_ITEM_TO_RESTAURANT = 'ADD_ITEM_TO_RESTAURANT'
export const REMOVE_ITEM_FROM_RESTAURANT = 'REMOVE_ITEM_FROM_RESTAURANT'
export const EDIT_NO_OF_ITEM_IN_RESTAURANT = 'EDIT_NO_OF_ITEM_IN_RESTAURANT'

export const addItemToRestaurant = (item, index) => ({
  type: ADD_ITEM_TO_RESTAURANT,
  payload: { item, index }
})

export const removeItemFromRestaurant = (item, index) => ({
  type: REMOVE_ITEM_FROM_RESTAURANT,
  payload: { item, index }
})

export const editNoOfItemInRestaurant = (userInput, item, index) => ({
  type: EDIT_NO_OF_ITEM_IN_RESTAURANT,
  payload: { userInput, item, index }
})
