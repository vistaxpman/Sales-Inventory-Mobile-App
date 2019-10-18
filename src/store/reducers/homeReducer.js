import * as Actions from '../actions'

const initialState = {
  areYouSureModalIsVisible: false,
  currentTab: 'bar',
  checkBottomSheetIsVisible: false,
  staffData: {
    AccessLavel: 'High',
    Branch: 'bar1',
    Department: 'Cashier',
    Name: 'cynthia okafor',
    Staff_ID: '01',
    Status: 'Open',
    Title: 'miss',
    password: 'p',
    username: 'cash'
  }
}

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.CHANGE_TAB: {
      return {
        ...state,
        currentTab: action.payload
      }
    }
    case Actions.TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY: {
      return {
        ...state,
        areYouSureModalIsVisible: action.payload
      }
    }
    case Actions.TOGGLE_CHECKOUT_BOTTOM_SHEET: {
      return {
        ...state,
        checkBottomSheetIsVisible: action.payload
      }
    }
    case Actions.SET_STAFF_DATA: {
      return {
        ...state,
        staffData: action.payload.staffData
      }
    }
    default: {
      return state
    }
  }
}

export default homeReducer
