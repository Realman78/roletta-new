import React, { useEffect, useRef } from 'react'
import {styled} from '@mui/system'

const MainContainer = styled('div')({
    height: '100%',
    width: '20%',
    backgroundColor: 'black',
    borderRadius: '8px'
})
const VideoElement = styled('video')({
    height: '100%',
    width: '100%',
})

function Video({stream, isLocalStream}) {
    const videoRef = useRef()
    useEffect(()=>{
        const video = videoRef.current
        video.srcObject = stream

        video.onloadedmetadata = ()=>{
            video.play()
        }
    }, [stream])
    return (
        <MainContainer>
            <VideoElement ref={videoRef} autoPlay muted={isLocalStream ? true : false}/>
        </MainContainer>
    )
}

export default Video