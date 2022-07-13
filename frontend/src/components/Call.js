import { styled } from '@mui/system'
import { connect } from 'react-redux'
import { getActions } from '../store/actions/authActions'
import { connectSocket } from '../rtc/socketConnection'
import MainContent from './Call/MainContent'
import ChatWrapper from './Call/ChatWrapper'

const MainContainer = styled('div')({
  width: '100%',
  height: '95%',
  display: 'flex',
})

function Call() {
  return (
    <MainContainer>
      <MainContent />
      <ChatWrapper />
    </MainContainer>
  )
}

export default Call