import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { connect } from 'react-redux'
import * as socketConnection from '../../../rtc/socketConnection'

const MainContainer = styled('div')({
    width: '100%',
    height: 'auto',
    display: 'flex',
    position: 'absolute',
    bottom: '0px'
})

const TextArea = styled('textarea')({
    width: '90%',
    fontSize: '16px',
    resize: 'none',
    borderRadius: '8px',
    paddingTop: '3px',
    paddingBottom: '3px',
})


function ChatFooter({username, userId, roomDetails}) {
  const [textareaContent, setTextareaContent] = useState('')
  const handleTextAreaChange = e => {
    setTextareaContent(e.target.value)
  }
  const keyDownHandler = e => {
    if(e.code === 'Enter'){
      setTextareaContent(tac => {
        tac.slice(0,-1)
      })
      handleSendMessage()
    }
  }
  const handleSendMessage = () => {
    setTextareaContent('')
    socketConnection.sendMessage({
      username,
      userId,
      textareaContent,
      roomId: roomDetails.roomId
    })
  }
  useEffect(()=>{
    if (textareaContent==='\n') setTextareaContent('')
  }, [textareaContent, setTextareaContent])
  return (
    <MainContainer>
      <TextArea value={textareaContent} onChange={handleTextAreaChange} onKeyDown={keyDownHandler} placeholder='Type a message...' ></TextArea>
      <IconButton style={{width: '10%'}} onClick={handleSendMessage}>
        <SendIcon  style={{color: 'white'}}/>
      </IconButton>
    </MainContainer>
  )
}

const mapStoreStateToProps = ({auth, room}) => {
  return {
    ...auth,
    ...room
  }
}

export default connect(mapStoreStateToProps)(ChatFooter)