import React from 'react'
import { styled } from '@mui/system'
import ChatMessagesContainer from './Chat/ChatMessagesContainer'
import ChatFooter from './Chat/ChatFooter'

const MainContainer = styled('div')({
    width: '19%',
    height: '99.5%',
    display: 'flex',
    borderLeft: '1px solid white',
    borderTop: '1px solid white',
    flexDirection: 'column',
    position: 'relative'
})

const TitleContainer = styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '4%',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '15px'
})

function ChatWrapper() {
    return (
        <MainContainer>
            <TitleContainer>
                CHAT
            </TitleContainer>
            <ChatMessagesContainer />
            <ChatFooter />
        </MainContainer>
    )
}

export default ChatWrapper