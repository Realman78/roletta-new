import io from 'socket.io-client'
import * as roomHandler from '../rtc/roomHandler'
import * as webRTCHandler from './webRTCHandler'
let socket = null

export const connectSocket = userId => {
    socket = io('http://localhost:5000', {
        auth: {
            uid: userId
        }
    })

    socket.on('connect', () => {
        console.log('Connected with socket server. ID: ' + socket.id)
    })

    socket.on('room-create', data => {
        roomHandler.newRoomCreated(data)
    })

    socket.on('active-rooms', data => {
        roomHandler.updateActiveRooms(data)
    })

    socket.on('conn-prepare', data => {
        const { connUserSocketId } = data
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, false)
        socket.emit('conn-init', { connUserSocketId })
    })

    socket.on('conn-init', data => {
        const { connUserSocketId } = data
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, true)
    })

    socket.on('room-participant-left', data => {
        console.log('user left room')
        webRTCHandler.handleParticipantLeftRoom(data)
    })
    
    socket.on('conn-signal', data => {
        webRTCHandler.handleSignalingData(data)
    })

}

export const createNewRoom = (data) => {
    socket.emit('room-create', data)
}

export const joinRoom = data => {
    socket.emit('room-join', data)
}

export const leaveRoom = data => {
    socket.emit('room-leave', data)
}

export const signalPeerData = data => {
    socket.emit('conn-signal', data)
}
