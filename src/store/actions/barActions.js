export const ADD_ITEM_TO_BAR = 'ADD_ITEM_TO_BAR'
export const REMOVE_ITEM_FROM_BAR = 'REMOVE_ITEM_FROM_BAR'
export const EDIT_NO_OF_ITEM_IN_BAR = 'EDIT_NO_OF_ITEM_IN_BAR'

export const addItemToBar = (item, index) => ({
  type: ADD_ITEM_TO_BAR,
  payload: { item, index }
})

export const removeItemFromBar = (item, index) => ({
  type: REMOVE_ITEM_FROM_BAR,
  payload: { item, index }
})

export const editNoOfItemInBar = (userInput, item, index) => ({
  type: EDIT_NO_OF_ITEM_IN_BAR,
  payload: { userInput, item, index }
})
