import React from 'react'
import {styled} from '@mui/system'
import ScreenShareButton from './ScreenShareButton'
import MicButton from './MicButton'
import CameraButton from './CameraButton'
import CloseCallButton from './CloseCallButton'
import { getActions } from '../../../store/actions/roomActions'

const MainContainer = styled('div')({
  width: '100%',
  height: '100%'
})

function Buttons(props) {
  return (
    <MainContainer>
      <ScreenShareButton />
      <MicButton localStream={props.localStream} />
      <CameraButton />
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