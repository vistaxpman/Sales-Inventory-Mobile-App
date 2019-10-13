import socketIOClient from 'socket.io-client'

export const socket = socketIOClient('http://192.168.43.92:3000', {
  transports: ['websocket'],
  jsonp: false
})

export const startSocketIO = store => {
  socket.connect()

  socket.on('connect', () => {
    console.log('connected to server.')
    // const { userId } = store.getState().user

    socket.on('disconnect', () => {
      console.log('connection to server lost.')
    })

    socket.on('hey', () => {
      console.log('hey doodle')
    })

    // socket.on('newMessage', message => {
    //   store.dispatch(storePublicMessages([message]))
    // })
  })
}
