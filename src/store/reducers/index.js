import { combineReducers } from 'redux'
import barReducer from './barReducer'
import cartReducer from './cartReducer'
import homeReducer from './homeReducer'
import restaurantReducer from './restaurantReducer'
import checkOutReducer from './checkOutReducer'

const reducer = combineReducers({
  barReducer: barReducer,
  cartReducer: cartReducer,
  homeReducer: homeReducer,
  restaurantReducer: restaurantReducer,
  checkOutReducer: checkOutReducer
})

export default reducer
