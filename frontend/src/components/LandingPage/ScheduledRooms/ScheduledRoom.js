import React, { useState } from 'react'
import { styled } from '@mui/system'
import { Tooltip, Typography } from '@mui/material'
import './ScheduledRooms.css'
import { toast } from 'react-toastify';

const MainContainer = styled('div')({
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    padding: '10px',
    paddingBottom: '20px',
    paddingTop: '20px',
    border: '1px solid white',
    borderRadius: '8px',
    position: 'relative'
})

const ExpireContainer = styled('div')({
    position: 'absolute',
    top: '0px',
    left: '10px',
})

function ScheduledRoom({ roomName, roomCode, isPlaceholder }) {
    const [copying, setCopying] = useState(false)

    const handleCopyCode = () => {
        navigator.clipboard.writeText(roomCode)
        setCopying(true)
        toast.info('Code copied to clipboard', { autoClose: 1000 })
        setTimeout(() => {
            setCopying(false)
        }, 2000)
    }
    return (
        <MainContainer>
            <ExpireContainer>
            <Typography sx={{ color: 'red', whiteSpace: 'nowrap', fontSize: '16px', textAlign: 'center' }}>
                    Expires in 2 hours
                </Typography>
            </ExpireContainer>
            <Tooltip title='Room Name' >
                <Typography sx={{ color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '34%', fontSize: '20px', textAlign: 'center' }}>
                    {isPlaceholder ? 'Room Name' : roomName}
                </Typography>
            </Tooltip>
            <Tooltip title='Room Code' placement='bottom'>
                <Typography onClick={handleCopyCode} sx={{color: copying ? 'lightblue' : 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '33%', fontSize: '20px', cursor: 'pointer',textAlign: 'center'  }}>
                    {isPlaceholder ? 'Room Code' : roomCode}
                </Typography>
            </Tooltip>
            <button class="button-64" role="button"><span class="text">Join</span></button>
        </MainContainer>
    )
}

export default ScheduledRoom