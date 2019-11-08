import socketIOClient from 'socket.io-client'
import { appUrl } from '../config'
import * as actions from '../store/actions'

export const socket = socketIOClient(appUrl, {
  transports: ['websocket'],
  jsonp: false
})

export const socketIO = store => {
  const { Staff_ID } = store.getState().homeReducer.staffData

  socket.connect()

  socket.on('connect', () => {
    console.log('connected to server.')

    socket.on('disconnect', () => {
      console.log('connection to server lost.')
    })

    socket.on('transactionDetailsUpdated', data => {
      store.dispatch(actions.updateOngoingTransactionInCart(data))
    })

    socket.on('cancelOrder', data => {
      store.dispatch(actions.cancelTransactionInCart(data))
    })

    socket.on('removeItem', data => {
      store.dispatch(actions.removeItemFromOngoingTransactionInCart(data))
    })

    socket.on('newCustomersAdded', data => {
      store.dispatch(actions.addNewCustomer(data))
    })

    socket.on('salesClosed', data => {
      store.dispatch(actions.removeAllItemsFromOngoingTransactionsInCart())
    })

    // store.subscribe(() => {
    //   const { Staff_ID } = store.getState().homeReducer.staffData
    //   if (Staff_ID) {
    //     socket.emit('getOngoingTransactions', Staff_ID, response => {})
    //   }
    // })

    socket.on('receiveOngoingTransactions', data => {
      // console.log('receiveOngoingTransactions')
      // console.log(data)
      // data.map(transaction => {})
      // delete Object.assign(o, { [newKey]: o[oldKey] })[oldKey]
      // store.dispatch(populateOngoingTransactionsInCart(data))
    })
  })
}
