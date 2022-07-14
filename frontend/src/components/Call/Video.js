import React, { useEffect, useRef } from 'react'
import {styled} from '@mui/system'
import { connect } from 'react-redux'
import { getActions } from '../../store/actions/roomActions'

const MainContainer = styled('div')({
    height: '100%',
    width: '20%',
    backgroundColor: 'black',
    borderRadius: '8px'
})
const VideoElement = styled('video')({
    height: '100%',
    width: '100%',
    cursor: 'pointer'
})

function Video({stream, isLocalStream, setChosenStream, isChosen}) {
    const videoRef = useRef()
    useEffect(()=>{
        const video = videoRef.current
        video.srcObject = stream

        video.onloadedmetadata = ()=>{
            video.play()
        }
    }, [stream])

    const handleVideoClick = () => {
        setChosenStream(stream)
    }
    return (
        <MainContainer style={{width: isChosen ? '100%' : '20%'}}>
            <VideoElement onClick={handleVideoClick} ref={videoRef} autoPlay muted={isLocalStream ? true : false}/>
        </MainContainer>
    )
}

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch)
    }
}

export default connect(null, mapActionsToProps)(Video)