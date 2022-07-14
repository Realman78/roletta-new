import React from 'react'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import './Header.css'
import { useMediaQuery } from 'react-responsive'
import {connect} from 'react-redux'

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

    return (
        <MainContainer style={{ height: isUserInRoom ? '5%' : '10%', justifyContent: isUserInRoom ? 'space-between' : 'center'}}>
            <HeaderWrapper>
                <Typography className={'header'} sx={{ fontSize: isMobile ? '30px' : '48px', color: 'white', fontWeight: 'bold', letterSpacing: '10px', margin: '0px', padding: '0px', textShadow: '0 0 0.15em #FE433C', filter: 'blur(0.007em)', marginLeft: isUserInRoom ? '1%' : '0' }}>
                    R
                </Typography>
                <Typography className={'header'} sx={{ fontSize: isMobile ? '30px' : '48px', color: 'white', fontWeight: 'bold', letterSpacing: '10px', margin: '0px', padding: '0px', textShadow: '0 0 0.15em #F31D64', filter: 'blur(0.007em)' }}>
                    O
                </Typography>
                <Typography className={'header'} sx={{ fontSize: isMobile ? '30px' : '48px', color: 'white', fontWeight: 'bold', letterSpacing: '10px', margin: '0px', padding: '0px', textShadow: '0 0 0.15em #A224AD', filter: 'blur(0.007em)' }}>
                    L
                </Typography>
                <Typography className={'header'} sx={{ fontSize: isMobile ? '30px' : '48px', color: 'white', fontWeight: 'bold', letterSpacing: '10px', margin: '0px', padding: '0px', textShadow: '0 0 0.15em #6A38B3', filter: 'blur(0.007em)' }}>
                    E
                </Typography>
                <Typography className={'header'} sx={{ fontSize: isMobile ? '30px' : '48px', color: 'white', fontWeight: 'bold', letterSpacing: '10px', margin: '0px', padding: '0px', textShadow: '0 0 0.15em #3C50B1', filter: 'blur(0.007em)' }}>
                    T
                </Typography>
                <Typography className={'header'} sx={{ fontSize: isMobile ? '30px' : '48px', color: 'white', fontWeight: 'bold', letterSpacing: '10px', margin: '0px', padding: '0px', textShadow: '0 0 0.15em #0095EF', filter: 'blur(0.007em)' }}>
                    T
                </Typography>
                <Typography className={'header'} sx={{ fontSize: isMobile ? '30px' : '48px', color: 'white', fontWeight: 'bold', letterSpacing: '10px', margin: '0px', padding: '0px', textShadow: '0 0 0.15em blue', filter: 'blur(0.007em)' }}>
                    A
                </Typography>
            </HeaderWrapper>
            {(isUserInRoom && roomDetails) && <Typography sx={{ fontSize: isMobile ? '20px' : '32px', color: 'white', fontWeight: 'bold', margin: '0px', padding: '0px', textShadow: '0 0 0.15em #3C50B1', filter: 'blur(0.007em)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{roomDetails?.roomName}</Typography>}
            {(isUserInRoom && !isMobile) && <Typography style={{ fontSize: isMobile ? '12px' : '20px', color: 'white', fontWeight: 'bold', margin: '0px', marginRight: '3px',padding: '0px', textShadow: '0 0 0.15em #3C50B1', filter: 'blur(0.007em)' }}>Code: {roomDetails?.roomCode}</Typography>}
        </MainContainer>
    )
}

const mapStoreStateToProps = ({room}) => {
    return {
        ...room
    }
} 

export default connect(mapStoreStateToProps)(Header)