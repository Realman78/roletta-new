import React from 'react'
import { styled } from '@mui/system'

const MainContainer = styled('div')({
    width: '20%',
    height: '100%',
    display: 'flex',
    backgroundColor: 'red'
})
function ChatWrapper() {
    return (
        <MainContainer>ChatWrapper</MainContainer>
    )
}

export default ChatWrapper