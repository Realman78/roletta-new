import React from 'react'
import { styled } from '@mui/system'

const MainContainer = styled('div')({
  width: '80%',
  minWidth: '10%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  backgroundColor: 'rgb(111,111,230)',
  color: 'white',
  borderRadius: '8px',
  wordBreak: 'break-all',
  fontSize: '18px',
  paddingRight: '10px',
  paddingLeft: '10px',
  paddingBottom: '10px'
})
const HeaderContainer = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '5px',
  fontStyle: 'italic',
  color: 'rgb(230,230,230)'
})
function ChatMessage({ isMine, content, senderName }) {
  return (
    <MainContainer style={{backgroundColor: isMine ? 'rgb(111,111,230)' : 'gray', marginLeft: isMine ? '0px' : '3px', borderBottomLeftRadius: isMine ? '8px' : '0px',borderBottomRightRadius: !isMine ? '8px' : '0px', }}>
      <HeaderContainer style={{ justifyContent: isMine ? 'flex-end' : 'flex-start' }}>
        {senderName}
      </HeaderContainer>
      {content}
    </MainContainer>
  )
}

export default ChatMessage