import socketIOClient from 'socket.io-client'

export const socket = socketIOClient('http://192.168.8.109:3000', {
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

    socket.on('Holla', () => {
      console.log('Holla')
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

    // socket.emit('getStaffSales', Staff_ID, response => {})
  })
}
