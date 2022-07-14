import React from 'react'
import { styled } from '@mui/system'
import Buttons from './Buttons/Buttons'
import { connect } from 'react-redux'
import { Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import NoteIcon from '@mui/icons-material/Note';
import { getActions } from '../../store/actions/roomActions'

const MainContainer = styled('div')({
  display: 'flex',
  width: '30%',
  height: '100%',
  flexDirection: 'column'
})
const TitleContainer = styled('div')({
  width: '100%',
  height: '50%',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
})

const ShowNotepadButtonWrapper = styled('div')({
  position: 'absolute',
  top: '0px',
  right: '0px'
})


function ControlsContainer({ roomDetails, chosenStream, setChosenStream }) {
  const handleShowNotepad = () => {
    setChosenStream(null)
  }

  return (
    <MainContainer style={{ width: roomDetails?.participants?.length > 3 ? '20%' : '30%' }}>
      <TitleContainer>
        {chosenStream && <ShowNotepadButtonWrapper>
          <IconButton onClick={handleShowNotepad} style={{ color: 'white' }}>
            <NoteIcon />
          </IconButton>
        </ShowNotepadButtonWrapper>}
        <Typography sx={{ margin: '0px', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>
          Code: {roomDetails?.roomCode}
        </Typography>
      </TitleContainer>
      <Buttons />
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

export default connect(mapStoreStateToProps, mapActionsToProps)(ControlsContainer)