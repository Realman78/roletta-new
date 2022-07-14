import React from 'react'
import { styled } from '@mui/system'

const MainContainer = styled('div')({
    maxWidth: '90%',
    minWidth: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'cyan',
    borderRadius: '8px'

})
const HeaderContainer = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '5px'
})
function ChatMessage({isMine, content, senderName}) {
  return (
    <MainContainer style={{paddingLeft: isMine ? '0px' : '3px', paddingRight: isMine ? '3px' : '0px', marginLeft: isMine ? '0px' : '3px', marginRight: isMine ? '3px' : '0px', alignItems: isMine ? 'flex-end': 'flex-start'}}>
      <HeaderContainer style={{justifyContent: isMine ? 'flex-end' : 'flex-start'}}>
        {senderName}
      </HeaderContainer>
      {content}
    </MainContainer>
  )
}

export default ChatMessage