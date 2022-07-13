const {v4:uuidv4} = require('uuid')

const connectedUsers = new Map()
let activeRooms = []

let io = null

const setSocketServerInstance = (ioInstance)=>{
    io = ioInstance
}

const getSocketServerInstance = ()=>{
    return io
}

const addNewConnectedUser = ({socketId, userId})=>{
    connectedUsers.set(socketId, {userId})
    console.log(connectedUsers)
}

const removeConnectedUser = socketId=>{
    if (connectedUsers.has(socketId)){
        connectedUsers.delete(socketId)
        console.log('user deleted')
    }
}

//rooms
const addNewActiveRoom = (userId, socketId, name) => {
    const newActiveRoom = {
        roomCreator: {
            userId,
            socketId,
            name
        },
        participants: [
            {
                userId,
                socketId,
                name
            }
        ],
        roomId: uuidv4(),
        roomCode: Math.floor(1000000 + Math.random() * 9999999)
    }
    activeRooms = [...activeRooms, newActiveRoom]
    return newActiveRoom
}

const getActiveRooms = ()=>{
    return [...activeRooms]
}

const getActiveRoom = (id)=>{
    const activeRoom = activeRooms.find(activeRoom => activeRoom.roomId===id)
    if (!activeRoom) return null
    return {
        ...activeRoom
    }
}

const joinActiveRoom = (roomId, newParticipant) =>{
    const room = activeRooms.find(room => room.roomId===roomId)
    activeRooms = activeRooms.filter(r=>r.roomId !== roomId)

    const updatedRoom = {
        ...room,
        participants: [...room.participants, newParticipant]
    }

    activeRooms.push(updatedRoom)
    console.log(activeRooms)
}

const leaveActiveRoom = (roomId, participantSocketId) => {
    const activeRoom = activeRooms.find(r => r.roomId === roomId)
    if (activeRoom){
        const copyOfAR = {...activeRoom}
        copyOfAR.participants = copyOfAR.participants.filter(participant => participant.socketId !== participantSocketId)

        activeRooms = activeRooms.filter(room => room.roomId !== roomId)
        if (copyOfAR.participants.length > 0){
            activeRooms.push(copyOfAR)
        }
    }
}

module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
    getSocketServerInstance,
    setSocketServerInstance,
    addNewActiveRoom,
    getActiveRooms,
    getActiveRoom,
    joinActiveRoom,
    leaveActiveRoom
}