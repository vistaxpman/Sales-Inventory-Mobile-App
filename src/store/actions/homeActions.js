export const CHANGE_TAB = 'CHANGE_TAB'
export const TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY =
  'TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY'

export const changeTab = tab => ({
  type: CHANGE_TAB,
  payload: tab
})

export const toggleAreYouSureModalVisibility = status => ({
  type: TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY,
  payload: status
})
