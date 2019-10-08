export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY =
  'TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY'
export const EDIT_NO_OF_ITEM = 'EDIT_NO_OF_ITEM'

export const addItem = (item, index) => ({
  type: ADD_ITEM,
  payload: { item, index }
})

export const removeItem = (item, index) => ({
  type: REMOVE_ITEM,
  payload: { item, index }
})

export const editNoOfItem = (userInput, item, index) => ({
  type: EDIT_NO_OF_ITEM,
  payload: { userInput, item, index }
})

export const toggleAreYouSureModalVisibility = status => ({
  type: TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY,
  payload: status
})
