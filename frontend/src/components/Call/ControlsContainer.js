import React, { useState } from 'react'
import { styled } from '@mui/system'
import Buttons from './Buttons/Buttons'
import { connect } from 'react-redux'
import { Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import NoteIcon from '@mui/icons-material/Note';
import SettingsIcon from '@mui/icons-material/Settings'
import CloseIcon from '@mui/icons-material/Close'
import { getActions } from '../../store/actions/roomActions'
import EditorSettings from './EditorSettings'
import { getActionsCode } from '../../store/actions/codeActions'
import { toast } from 'react-toastify';

const MainContainer = styled('div')({
  display: 'flex',
  width: '30%',
  height: '100%',
  flexDirection: 'column',
  position: 'relative'
})
const TitleContainer = styled('div')({
  width: '100%',
  height: '50%',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
})

const ControlButtonWrapper = styled('div')({
  position: 'absolute',
  top: '0px',
  right: '0px'
})


function ControlsContainer({ roomDetails, chosenStream, setChosenStream, showEditorSettings, setShowEditorSettings }) {
  const [copying, setCopying] = useState(false)

  const handleShowNotepad = () => {
    setChosenStream(null)
  }

  const handleShowEditorSettings = () => {
    setShowEditorSettings(!showEditorSettings)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomDetails?.roomCode)
    setCopying(true)
    toast.info('Code copied to clipboard', { autoClose: 1000 })
    setTimeout(() => {
      setCopying(false)
    }, 2000)
  }

  return (
    <MainContainer style={{ width: roomDetails?.participants?.length > 3 ? '20%' : '30%' }}>
      {chosenStream ? <ControlButtonWrapper>
        <IconButton onClick={handleShowNotepad} style={{ color: 'white' }}>
          <NoteIcon />
        </IconButton>
      </ControlButtonWrapper> : <ControlButtonWrapper>
        <IconButton onClick={handleShowEditorSettings} style={{ zIndex: 2000, color: showEditorSettings ? 'red' : 'white' }}>
          {showEditorSettings ? <CloseIcon className='closeCallButton' /> : <SettingsIcon className='controlButton' />}
        </IconButton>
      </ControlButtonWrapper>}
      {(showEditorSettings && !chosenStream) ? <EditorSettings /> : <>
        <TitleContainer>
          <Typography sx={{ margin: '0px', marginTop: '20px', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>
            {roomDetails?.roomName}
          </Typography>
          <Typography onClick={handleCopyCode} sx={{ cursor: 'pointer', margin: '0px', marginTop: '10px', fontSize: '20px', color: copying ? 'lightblue' : 'white', fontWeight: 'bold' }}>
            Code: {roomDetails?.roomCode}
          </Typography>
        </TitleContainer>
        <Buttons />
      </>}
    </MainContainer>
  )
}

const mapStoreStateToProps = ({ room, code }) => {
  return {
    ...room,
    ...code
  }
}

const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch),
    ...getActionsCode(dispatch)
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(ControlsContainer)