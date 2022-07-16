import { styled } from '@mui/system'
import MainContent from './Call/MainContent'
import ChatWrapper from './Call/ChatWrapper'
import { connect } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

const MainContainer = styled('div')({
  width: '100%',
  height: '95%',
  display: 'flex',
})

function Call({ isChatHidden }) {
  const isShort = useMediaQuery({ query: '(max-height: 650px)' })

  return (
    <MainContainer style={{ height: isShort ? '99%' : '95%' }}>
      <MainContent />
      <ChatWrapper isChatHidden={isChatHidden} />
    </MainContainer>
  )
}

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room
  }
}

export default connect(mapStoreStateToProps)(Call)