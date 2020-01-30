import * as Actions from '../actions'
import update from 'react-addons-update'

const initialState = {
  bar: [],
  barClone: [],
  barCheckOut: [],
  restaurant: [],
  restaurantClone: [],
  restaurantCheckOut: [],
  selectedOrderTransactionId: ''
}

const moreItemsToOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.UPDATE_NO_OF_ITEM_IN_MORE_BAR: {
      
      state.barClone[action.payload.index].noInCheckOut = action.payload.value
      state.barClone[action.payload.index].newPrice = Number(action.payload.value) * Number(state.barClone[action.payload.index].price)

      const newBarCheckOut = () => {
        return state.barClone.filter(item => item.noInCheckOut > 0)
      }

      let newTotalNumberOfItemsAddedFromBar = 0, newTotalAmountOfItemsAddedFromBar = 0;

      for (let anItem of state.barClone) {
        newTotalNumberOfItemsAddedFromBar += Number(anItem.noInCheckOut)
        if (anItem.noInCheckOut > 0) {
          newTotalAmountOfItemsAddedFromBar +=
            Number(anItem.price) * Number(anItem.noInCheckOut)
        }
      }

      return update(state, {
        bar: {
          [action.payload.index]: {
            noInCheckOut: { $set: action.payload.value }
          }
        },
        totalNumberOfItemsAddedFromBar: {
          $set: newTotalNumberOfItemsAddedFromBar
        },
        totalAmountOfItemsAddedFromBar: {
          $set: newTotalAmountOfItemsAddedFromBar
        },
        barCheckOut: { $set: newBarCheckOut() }
      })
    }
    case Actions.CLEAR_ITEMS_IN_MORE_BAR: {
      const newbar = state.bar.map((item, index) => {
        item.noInCheckOut = 0
        return item
      })

      return {
        ...state,
        bar: newbar,
        totalNumberOfItemsAddedFromBar: 0,
        totalAmountOfItemsAddedFromBar: 0,
        barCheckOut: []
      }
    }
    case Actions.UPDATE_NO_OF_ITEM_IN_MORE_RESTAURANT: {
      
      state.restaurantClone[action.payload.index].noInCheckOut = action.payload.value
      state.restaurantClone[action.payload.index].newPrice = Number(action.payload.value) * Number(state.restaurantClone[action.payload.index].price)

      const newRestaurantCheckOut = () => {
        return state.restaurantClone.filter(item => item.noInCheckOut > 0)
      }

      let newTotalNumberOfItemsAddedFromRestaurant = 0, newTotalAmountOfItemsAddedFromRestaurant = 0

      for (let anItem of state.restaurantClone) {
        newTotalNumberOfItemsAddedFromRestaurant += Number(anItem.noInCheckOut)
        if (anItem.noInCheckOut > 0) {
          newTotalAmountOfItemsAddedFromRestaurant +=
            Number(anItem.price) * Number(anItem.noInCheckOut)
        }
      }

      return update(state, {
        restaurant: {
          [action.payload.index]: {
            noInCheckOut: { $set: action.payload.value }
          }
        },
        totalNumberOfItemsAddedFromRestaurant: {
          $set: newTotalNumberOfItemsAddedFromRestaurant
        },
        totalAmountOfItemsAddedFromRestaurant: {
          $set: newTotalAmountOfItemsAddedFromRestaurant
        },
        restaurantCheckOut: { $set: newRestaurantCheckOut() }
      })
    }
    case Actions.CLEAR_ITEMS_IN_MORE_RESTAURANT: {
      const newRestaurant = state.restaurant.map(item => {
        item.noInCheckOut = 0
        return item
      })
      return {
        ...state,
        restaurant: newRestaurant,
        totalNumberOfItemsAddedFromRestaurant: 0,
        totalAmountOfItemsAddedFromRestaurant: 0,
        restaurantCheckOut: []
      }
    }
    case Actions.CHANGE_SELECTED_ORDER_TRANSACTION_ID: {
      return {
        ...state,
        selectedOrderTransactionId: action.payload
      }
    }
    case Actions.POPULATE_ITEMS_IN_MORE_BAR: {
      return {
        ...state,
        bar: action.payload,
        barClone: action.payload
      }
    }
    case Actions.POPULATE_ITEMS_IN_MORE_RESTAURANT: {
      return {
        ...state,
        restaurant: action.payload,
        restaurantClone: action.payload
      }
    }
    case Actions.FILTER_ITEMS_IN_MORE_BAR: {
      let newbar = []
      if (action.payload.value) {
        newbar = state.barClone.filter(item =>
          item.name.toLowerCase().includes(action.payload.value.toLowerCase())
        )
      } else {
        newbar = state.barClone
      }

      return update(state, {
        bar: {
          $set: newbar
        }
      })
    }
    case Actions.FILTER_ITEMS_IN_MORE_RESTAURANT: {
      let newRestaurant = []
      if (action.payload.value) {
        newRestaurant = state.restaurantClone.filter(item =>
          item.name.toLowerCase().includes(action.payload.value.toLowerCase())
        )
      } else {
        newRestaurant = state.restaurantClone
      }

      return update(state, {
        restaurant: {
          $set: newRestaurant
        }
      })
    }
    default: {
      return state
    }
  }
}

export default moreItemsToOrderReducer
