import React from 'react'
import { styled } from '@mui/system'
import ChatMessage from './ChatMessage'
const MainContainer = styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: '10px',
})

function ChatMessageContainer({isMine, content, senderName}) {
  return (
    <MainContainer style={{alignItems: isMine ? 'flex-end' : 'flex-start'}}>
      <ChatMessage content={content} senderName={senderName} isMine={isMine}/>
    </MainContainer>
  )
}

export default ChatMessageContainer