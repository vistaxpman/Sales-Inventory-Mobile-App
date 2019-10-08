import { combineReducers } from 'redux'
import barReducer from './barReducer'
import cartReducer from './cartReducer'
import homeReducer from './homeReducer'
import restaurantReducer from './restaurantReducer'

const reducer = combineReducers({
  barReducer: barReducer,
  cartReducer: cartReducer,
  homeReducer: homeReducer,
  restaurantReducer: restaurantReducer
})

export default reducer
