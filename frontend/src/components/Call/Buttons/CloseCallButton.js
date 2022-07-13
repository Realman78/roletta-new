import React from 'react'
import * as roomHandler from '../../../rtc/roomHandler'

function CloseCallButton() {
  const handleLeaveRoom = () => {
    roomHandler.leaveRoom()
  }
  return (
    <button onClick={handleLeaveRoom}>CloseCallButton</button>
  )
}

export default CloseCallButton