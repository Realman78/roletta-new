const serverStore = require('../socketStore')
const roomUpdates = require('./updates/rooms')

const roomCreateHandler = (socket, data)=>{
    const {name, roomName} = data
    const socketId = socket.id
    const userId = socket.user
    const roomDetails = serverStore.addNewActiveRoom(userId, socketId, name, roomName)

    socket.emit('room-create', {
        roomDetails
    })

    roomUpdates.updateRooms()
}

module.exports = roomCreateHandler