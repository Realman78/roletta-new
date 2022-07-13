import React from 'react'
import { styled } from '@mui/system'
import { connect } from 'react-redux'
import './ContentContainer.css'

const MainContainer = styled('div')({
    width: '100%',
    height: '75%',
    backgroundColor: 'green'
})

const Video = styled('video')({
    display: 'none'
})
function ContentContainer() {
    return (
        <MainContainer className='container'>
            <textarea name="shared" placeholder="This is a shared notepad"></textarea>
            <Video autoplay playsinline></Video>
        </MainContainer>
    )
}

export default ContentContainer