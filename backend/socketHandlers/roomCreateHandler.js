const serverStore = require('../socketStore')
const roomUpdates = require('./updates/rooms')

const roomCreateHandler = (socket, name)=>{
    const socketId = socket.id
    const userId = socket.user
    const roomDetails = serverStore.addNewActiveRoom(userId, socketId, name)

    socket.emit('room-create', {
        roomDetails
    })

    roomUpdates.updateRooms()
}

module.exports = roomCreateHandler