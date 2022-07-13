import store from '../store/store'
import { setOpenRoom, setRoomDetails, setActiveRooms, setLocalStream, setRemoteStreams, setScreenSharingStream, setIsUserJoinedOnlyWithAudio } from '../store/actions/roomActions'
import * as socketConnection from './socketConnection'
import * as webRTCHandler from './webRTCHandler'

export const createNewRoom = (name) => {
    const successCallback = () => {
        store.dispatch(setOpenRoom(true, true))
        store.dispatch(setIsUserJoinedOnlyWithAudio(store.getState().room.audioOnly))
        socketConnection.createNewRoom(name)
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
        rooms.push({ ...room, creatorUsername: room.username })
    });
    store.dispatch(setActiveRooms(rooms))
}
export const joinRoom = (roomCode, yourName) => {
    const {roomId} = store.getState().room.activeRooms.find(r => r.roomCode.toString().trim() === roomCode.toString().trim())
    if (!roomId) return false
    const successCallback = () => {
        store.dispatch(setRoomDetails({ roomId }))
        store.dispatch(setOpenRoom(false, true))
        store.dispatch(setIsUserJoinedOnlyWithAudio(store.getState().room.audioOnly))
        socketConnection.joinRoom({ roomId, name: yourName })
    }
    const audioOnly = store.getState().room.audioOnly
    webRTCHandler.getLocalStreamPreview(audioOnly, successCallback)
    return true
}

export const leaveRoom = () => {
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

    store.dispatch(setRemoteStreams([]))
    webRTCHandler.closeAllConnections()

    socketConnection.leaveRoom({ roomId })
    store.dispatch(setRoomDetails(null))
    store.dispatch(setOpenRoom(false, false))
}