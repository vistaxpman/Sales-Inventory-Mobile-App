import { combineReducers } from 'redux'
import barReducer from './barReducer'
import cartReducer from './cartReducer'

const reducer = combineReducers({
  barReducer: barReducer,
  cartReducer: cartReducer
})

export default reducer
