import React from 'react'
import {connect} from 'react-redux'
import { styled } from '@mui/system'
import ScheduledRoom from './ScheduledRoom'

const MainContainer = styled('div')({
    width: '100%',
    height: '75%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px'
})

function ScheduledRooms({scheduledRooms}) {
  return (
    <MainContainer className='scheduledRoomsContainer'>
        {/* <ScheduledRoom isPlaceholder/> */}
        {scheduledRooms.map(r=><ScheduledRoom key={r._id} roomName={r.roomName} roomCode={r.roomCode}/>)}
    </MainContainer>
  )
}

const mapStoreStateToProps = ({room}) => {
    return {
        ...room
    }
}

export default connect(mapStoreStateToProps)(ScheduledRooms)