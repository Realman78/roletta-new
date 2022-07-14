import React from 'react'
import IconButton from '@mui/material/IconButton'
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled'
import * as roomHandler from '../../../rtc/roomHandler'
import './Buttons.css'

function CloseCallButton() {
  const handleLeaveRoom = () => {
    roomHandler.leaveRoom()
  }
  return (
    <IconButton  onClick={handleLeaveRoom} style={{color:'white'}}>
        <PhoneDisabledIcon className='closeCallButton'/>
    </IconButton>
  )
}

export default CloseCallButton