export const CHANGE_TAB = 'CHANGE_TAB'
export const TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY =
  'TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY'
export const TOGGLE_CHECKOUT_BOTTOM_SHEET = 'TOGGLE_CHECKOUT_BOTTOM_SHEET'
export const SET_STAFF_DATA = 'SET_STAFF_DATA'
export const SET_CUSTOMER_NAMES = 'SET_CUSTOMER_NAMES'
export const POPULATE_ITEMS_IN_SALES = 'POPULATE_ITEMS_IN_SALES'

export const changeTab = tab => ({
  type: CHANGE_TAB,
  payload: tab
})

export const toggleAreYouSureModalVisibility = status => ({
  type: TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY,
  payload: status
})

export const toggleCheckOutBottomSheet = status => ({
  type: TOGGLE_CHECKOUT_BOTTOM_SHEET,
  payload: status
})

export const setStaffData = staffData => ({
  type: SET_STAFF_DATA,
  payload: { staffData }
})

export const setCustomerNames = customerNames => ({
  type: SET_CUSTOMER_NAMES,
  payload: customerNames
})

export const populateItemsInSales = value => ({
  type: POPULATE_ITEMS_IN_SALES,
  payload: value
})
