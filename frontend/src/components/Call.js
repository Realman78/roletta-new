import { styled } from '@mui/system'
import MainContent from './Call/MainContent'
import ChatWrapper from './Call/ChatWrapper'
import {connect} from 'react-redux'

const MainContainer = styled('div')({
  width: '100%',
  height: '95%',
  display: 'flex',
})

function Call({isChatHidden}) {
  return (
    <MainContainer>
      <MainContent />
      {!isChatHidden && <ChatWrapper />}
    </MainContainer>
  )
}

const mapStoreStateToProps = ({room}) => {
  return {
    ...room
  }
}

export default connect(mapStoreStateToProps)(Call)