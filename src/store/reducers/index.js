import { combineReducers } from 'redux'
import homeReducer from './homeReducer'
import barReducer from './barReducer'
import restaurantReducer from './restaurantReducer'
import cartReducer from './cartReducer'
import checkOutReducer from './checkOutReducer'
import moreItemsToOrderReducer from './moreItemsToOrderReducer'

const reducer = combineReducers({
  homeReducer: homeReducer,
  barReducer: barReducer,
  restaurantReducer: restaurantReducer,
  cartReducer: cartReducer,
  checkOutReducer: checkOutReducer,
  moreItemsToOrderReducer: moreItemsToOrderReducer
})

export default reducer
