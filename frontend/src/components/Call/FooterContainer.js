import React from 'react'
import { styled } from '@mui/system'
import { connect } from 'react-redux'
import Video from './Video'
import ControlsContainer from './ControlsContainer'

const MainContainer = styled('div')({
    display: 'flex',
    width: '100%',
    height: '25%',
    justifyContent: 'center'
})



function FooterContainer({localStream, remoteStreams, screenSharingStream}) {
    return (
        <MainContainer>
            <Video stream={screenSharingStream ? screenSharingStream : localStream} isLocalStream={true} />
            <ControlsContainer />
            {remoteStreams.map(rs => <Video key={rs.id} stream={rs} isLocalStream={false} />)}
        </MainContainer>
    )
}

const mapStoreStateToProps = ({room}) => {
    return {
        ...room
    }
}

export default connect(mapStoreStateToProps)(FooterContainer)