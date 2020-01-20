import * as Actions from '../actions'
import update from 'react-addons-update'

const initialState = {
  totalNumberOfItemsAddedFromBar: 0,
  totalAmountOfItemsAddedFromBar: 0,
  bar: [],
  barClone: [],
  barCheckOut: []
}

const barReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.UPDATE_NO_OF_ITEM_IN_BAR: {
      let itemIndex = ''
      const newbar = state.barClone.map((item, index) => {
        if (item.itemId === action.payload.itemId) {
          item.isPosted = false
          item.noInCheckOut = action.payload.value
          item.formerNoInCheckOut = action.payload.value
          item.newPrice = Number(action.payload.value) * Number(item.price)
          itemIndex = index
        }

        return item
      })

      const newbarCheckOut = () => {
        return newbar.filter(item => item.noInCheckOut > 0)
      }

      let newTotalNumberOfItemsAddedFromBar = 0
      let newTotalAmountOfItemsAddedFromBar = 0
      for (let anItem of newbar) {
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
        barClone: {
          [itemIndex]: {
            noInCheckOut: { $set: action.payload.value }
          }
        },
        totalNumberOfItemsAddedFromBar: {
          $set: newTotalNumberOfItemsAddedFromBar
        },
        totalAmountOfItemsAddedFromBar: {
          $set: newTotalAmountOfItemsAddedFromBar
        },
        barCheckOut: { $set: newbarCheckOut() }
      })
    }
    case Actions.CLEAR_ITEMS_IN_BAR: {
      const newbar = state.bar.map((item, index) => {
        item.noInCheckOut = 0
        return item
      })

      const newBarClone = state.barClone.map((item, index) => {
        item.noInCheckOut = 0
        return item
      })

      return {
        ...state,
        bar: newbar,
        barClone: newBarClone,
        totalNumberOfItemsAddedFromBar: 0,
        totalAmountOfItemsAddedFromBar: 0,
        barCheckOut: []
      }
    }
    case Actions.UPDATE_NO_OF_ITEM_FOR_BAR_CHECKOUT: {
      let itemIndex = ''
      const newbar = state.bar.map((item, index) => {
        if (item.itemId === action.payload.itemId) {
          item.noInCheckOut = action.payload.value
          item.newPrice = Number(action.payload.value) * Number(item.price)
          itemIndex = index
        }
        return item
      })

      const newbarCheckOut = () => {
        return newbar.filter(item => item.noInCheckOut > 0)
      }

      let newTotalNumberOfItemsAddedFromBar = 0
      let newTotalAmountOfItemsAddedFromBar = 0
      for (let anItem of newbar) {
        newTotalNumberOfItemsAddedFromBar += Number(anItem.noInCheckOut)
        if (anItem.noInCheckOut > 0) {
          newTotalAmountOfItemsAddedFromBar +=
            Number(anItem.price) * Number(anItem.noInCheckOut)
        }
      }

      return update(state, {
        bar: {
          [itemIndex]: {
            noInCheckOut: { $set: action.payload.value }
          }
        },
        totalNumberOfItemsAddedFromBar: {
          $set: newTotalNumberOfItemsAddedFromBar
        },
        totalAmountOfItemsAddedFromBar: {
          $set: newTotalAmountOfItemsAddedFromBar
        },
        barCheckOut: { $set: newbarCheckOut() }
      })
    }
    case Actions.FILTER_ITEMS_IN_BAR: {
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
    case Actions.POPULATE_ITEMS_IN_BAR: {
      return {
        ...state,
        bar: action.payload,
        barClone: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default barReducer
