import React, { useState } from 'react'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import './Header.css'
import { useMediaQuery } from 'react-responsive'
import { connect } from 'react-redux'
import * as roomHandler from '../rtc/roomHandler'
import { toast } from 'react-toastify';

const MainContainer = styled('div')({
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

const HeaderWrapper = styled('div')({
    display: 'flex'
})

function Header({ isUserInRoom, roomDetails }) {
    const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })
    const isShort = useMediaQuery({ query: '(max-height: 650px)' })
    const [copying, setCopying] = useState(false)

    const handleLeaveRoom = () => {
        if (isUserInRoom)
            roomHandler.leaveRoom()
    }

    const handleCopyCode = () => {
        navigator.clipboard.writeText(roomDetails?.roomCode)
        setCopying(true)
        toast.info('Code copied to clipboard', { autoClose: 1000 })
        setTimeout(() => {
            setCopying(false)
        }, 2000)
    }

    return (<>
        {!isShort && <MainContainer style={{ height: isUserInRoom ? '5%' : '10%', justifyContent: isUserInRoom ? 'space-between' : 'center' }}>
            <HeaderWrapper onClick={handleLeaveRoom} style={{ cursor: isUserInRoom ? 'pointer' : 'auto' }}>
                <Typography className={'header'} sx={{ fontSize: isMobile ? '30px' : '48px', color: 'white', fontWeight: 'bold', letterSpacing: '10px', margin: '0px', padding: '0px', textShadow: '0 0 0.15em blue', filter: 'blur(0.007em)' }}>
                    ROLETTA
                </Typography>
            </HeaderWrapper>
            {(isUserInRoom && roomDetails) && <Typography sx={{ fontSize: isMobile ? '20px' : '32px', color: 'white', fontWeight: 'bold', margin: '0px', padding: '0px', textShadow: '0 0 0.15em #3C50B1', filter: 'blur(0.007em)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{roomDetails?.roomName}</Typography>}
            {(isUserInRoom && !isMobile) && <Typography onClick={handleCopyCode} style={{ cursor: 'pointer', fontSize: isMobile ? '12px' : '20px', color: copying ? 'lightblue' : 'white', fontWeight: 'bold', margin: '0px', marginRight: '3px', padding: '0px', textShadow: '0 0 0.15em #3C50B1', filter: 'blur(0.007em)' }}>Code: {roomDetails?.roomCode}</Typography>}
        </MainContainer>}
    </>
    )
}

const mapStoreStateToProps = ({ room }) => {
    return {
        ...room
    }
}

export default connect(mapStoreStateToProps)(Header)