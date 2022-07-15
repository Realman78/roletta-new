import store from '../store/store'
import { setOpenRoom, setRoomDetails, setActiveRooms, setLocalStream, setRemoteStreams, setScreenSharingStream, setIsUserJoinedOnlyWithAudio, setChosenStream, setIsChatHidden } from '../store/actions/roomActions'
import * as socketConnection from './socketConnection'
import * as webRTCHandler from './webRTCHandler'
import { setUsername } from '../store/actions/authActions'

export const createNewRoom = (name, roomName) => {
    const successCallback = () => {
        store.dispatch(setOpenRoom(true, true))
        store.dispatch(setIsUserJoinedOnlyWithAudio(store.getState().room.audioOnly))
        store.dispatch(setUsername(name))
        socketConnection.createNewRoom(name, roomName)
    }
    const audioOnly = store.getState().room.audioOnly
    webRTCHandler.getLocalStreamPreview(audioOnly, successCallback)
}
export const newRoomCreated = (data) => {
    const { roomDetails } = data

    store.dispatch(setRoomDetails(roomDetails))
}
export const updateActiveRooms = data => {
    const { activeRooms } = data

    const rooms = []
    const userId = store.getState().auth.userId

    activeRooms.forEach(room => {
        const isRoomCreatedByMe = room.roomCreator.userId === userId
        if (isRoomCreatedByMe) rooms.push({ ...room, creatorUsername: 'Me' })
        else rooms.push({ ...room, creatorUsername: room.username })
    });
    store.dispatch(setActiveRooms(rooms))
}
export const joinRoom = (roomCode, yourName) => {
    const room = store.getState().room.activeRooms.find(r => r.roomCode.toString().trim() === roomCode.toString().trim())
    if (!room?.roomId) return false
    const { roomId, roomName, sharedNotepadContent, chatMessages, participants } = room
    const successCallback = () => {
        store.dispatch(setRoomDetails({ roomId, roomCode, roomName, sharedNotepadContent, chatMessages, participants }))
        store.dispatch(setOpenRoom(false, true))
        store.dispatch(setIsUserJoinedOnlyWithAudio(store.getState().room.audioOnly))
        store.dispatch(setUsername(yourName))
        socketConnection.joinRoom({ roomId, name: yourName })
        socketConnection.sendMessage({
            username: 'System',
            userId: 1308,
            textareaContent: `${yourName} joined the room!`,
            roomId
        })
    }
    const audioOnly = store.getState().room.audioOnly
    webRTCHandler.getLocalStreamPreview(audioOnly, successCallback)
    return true
}

export const leaveRoom = () => {
    if (window.confirm("Are you sure you want to leave the room?") == false) return 
    const roomId = store.getState().room.roomDetails.roomId

    const localStream = store.getState().room.localStream
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop())
        store.dispatch(setLocalStream(null))
    }

    const screenSharingStream = store.getState().room.screenSharingStream
    if (screenSharingStream) {
        screenSharingStream.getTracks().forEach(t => t.stop())
        store.dispatch(setScreenSharingStream(null))
    }

    store.dispatch(setChosenStream(null))

    store.dispatch(setRemoteStreams([]))
    store.dispatch(setIsChatHidden(false))
    webRTCHandler.closeAllConnections()

    socketConnection.leaveRoom({ roomId })
    store.dispatch(setRoomDetails(null))
    store.dispatch(setOpenRoom(false, false))
    socketConnection.sendMessage({
        username: 'System',
        userId: 1308,
        textareaContent: `${store.getState().auth.username} left the room.`,
        roomId
    })
}