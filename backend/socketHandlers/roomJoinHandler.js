const serverStore = require('../socketStore')
const roomUpdates = require('../socketHandlers/updates/rooms')

const roomJoinHandler = (socket, data)=>{
    const {roomId, name} = data
    console.log(data)

    const participantDetails = {
        userId: socket.user,
        socketId: socket.id,
        name
    }

    const roomDetails = serverStore.getActiveRoom(roomId)
    serverStore.joinActiveRoom(roomId, participantDetails)

    //send info to users in room that they should prepare for incoming connection
    roomDetails.participants.forEach(p => {
        if (p.socketId === participantDetails.socketId) return
        console.log('kad se joina on emitira: ', participantDetails.socketId, participantDetails.userId)
        socket.to(p.socketId).emit('conn-prepare', {
            connUserSocketId: participantDetails.socketId
        })
    })

    roomUpdates.updateRooms()
}

module.exports = roomJoinHandler