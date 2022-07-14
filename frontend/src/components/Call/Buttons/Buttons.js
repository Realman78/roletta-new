import React from 'react'
import {styled} from '@mui/system'
import ScreenShareButton from './ScreenShareButton'
import MicButton from './MicButton'
import CameraButton from './CameraButton'
import CloseCallButton from './CloseCallButton'
import ShowChatButton from './ShowChatButton'
import { getActions } from '../../../store/actions/roomActions'
import {connect} from 'react-redux'
const MainContainer = styled('div')({
  width: '100%',
  height: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
})

function Buttons(props) {
  return (
    <MainContainer>
      <ShowChatButton isChatHidden={props.isChatHidden} setIsChatHidden={props.setIsChatHidden}/>
      {!props.isUserJoinedWithOnlyAudio && <ScreenShareButton {...props} />}
      <MicButton localStream={props.localStream} />
      {!props.isUserJoinedWithOnlyAudio && <CameraButton localStream={props.localStream}/>}
      <CloseCallButton />
    </MainContainer>
  )
}

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room
  }
}

const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch)
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(Buttons)