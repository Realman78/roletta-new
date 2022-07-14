import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { connect } from 'react-redux'
import * as socketConnection from '../../../rtc/socketConnection'
import './Chat.css'
import { useMediaQuery } from 'react-responsive'

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
  overflowY: 'scroll'
})


function ChatFooter({ username, userId, roomDetails }) {
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });

  const [textareaContent, setTextareaContent] = useState('')
  const handleTextAreaChange = e => {
    setTextareaContent(e.target.value)
  }
  const keyDownHandler = e => {
    if (e.code === 'Enter') {
      if (textareaContent.trim().length < 1) return
      setTextareaContent(tac => {
        tac.slice(0, -1)
      })
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (textareaContent.trim().length < 1) return
    socketConnection.sendMessage({
      username,
      userId,
      textareaContent,
      roomId: roomDetails.roomId
    })
    setTextareaContent('')
  }

  useEffect(() => {
    if (textareaContent === '\n') setTextareaContent('')
  }, [textareaContent, setTextareaContent])

  return (
    <MainContainer>
      <TextArea style={{width: isMobile ? '100%' : '90%'}} className='ta' value={textareaContent} onChange={handleTextAreaChange} onKeyDown={keyDownHandler} placeholder='Type a message...' ></TextArea>
      {!isMobile && <IconButton style={{ width: '10%' }} onClick={handleSendMessage}>
        <SendIcon style={{ color: 'white' }} />
      </IconButton>}
    </MainContainer>
  )
}

const mapStoreStateToProps = ({ auth, room }) => {
  return {
    ...auth,
    ...room
  }
}

export default connect(mapStoreStateToProps)(ChatFooter)