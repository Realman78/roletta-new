import React from 'react'
import { styled } from '@mui/system'
import {connect} from 'react-redux'
import ChatMessageContainer from './ChatMessageContainer'
import './Chat.css'


const MainContainer = styled('div')({
  width: '100%',
  height: '88%',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
})

function ChatMessagesContainer({roomDetails, userId}) {
  return (
    <MainContainer className='chatMessagesContainer'>
      {roomDetails?.chatMessages.map(message => <ChatMessageContainer key={message.id} id={message.id} isMine={message.userId === userId} content={message.content} senderName={message.senderName}/>)}
    </MainContainer>
  )
}

const mapStoreStateToProps = ({room, auth}) => {
  return {
    ...room,
    ...auth
  }
}

export default connect(mapStoreStateToProps)(ChatMessagesContainer)