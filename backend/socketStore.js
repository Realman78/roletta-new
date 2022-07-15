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
const addNewActiveRoom = (userId, socketId, name, roomName) => {
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
        roomCode: Math.floor(1000000 + Math.random() * 9999999),
        roomName,
        sharedNotepadContent: '',
        chatMessages: []
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

const updateSharedNotepad = ({roomId, sharedNotepadContent}) => {
    const room = activeRooms.find(room => room.roomId===roomId)
    activeRooms = activeRooms.filter(r=>r.roomId !== roomId)

    const updatedRoom = {
        ...room,
        sharedNotepadContent
    }

    
    activeRooms.push(updatedRoom)
    return updatedRoom
}

const updateChatMessages = ({roomId, username, userId, textareaContent}) => {
    const room = activeRooms.find(room => room.roomId===roomId)
    activeRooms = activeRooms.filter(r=>r.roomId !== roomId)
    const newChatMessage = {
        senderName: username,
        userId,
        content: textareaContent,
        id: uuidv4(),
    }

    if (!room) return null

    const updatedRoom = {
        ...room,
        chatMessages: [...room.chatMessages, newChatMessage]
    }

    
    activeRooms.push(updatedRoom)
    return updatedRoom
}
const deleteChatMessage = ({roomId,messageId}) => {
    const room = activeRooms.find(room => room.roomId===roomId)
    activeRooms = activeRooms.filter(r=>r.roomId !== roomId)
    const newChatMessages = room.chatMessages.filter((message)=>message.id !== messageId)

    const updatedRoom = {
        ...room,
        chatMessages: newChatMessages
    }

    
    activeRooms.push(updatedRoom)
    return updatedRoom
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
    leaveActiveRoom,
    updateSharedNotepad,
    updateChatMessages,
    deleteChatMessage
}