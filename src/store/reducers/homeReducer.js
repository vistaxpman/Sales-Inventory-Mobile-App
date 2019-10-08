import * as Actions from '../actions'
import update from 'react-addons-update'

const initialState = {
  areYouSureModalIsVisible: false,
  currentTab: 'bar'
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
    default: {
      return state
    }
  }
}

export default homeReducer
