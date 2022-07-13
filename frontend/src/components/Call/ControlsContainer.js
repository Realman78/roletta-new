import React from 'react'
import { styled } from '@mui/system'
import Buttons from './Buttons/Buttons'
import {connect} from 'react-redux'

const MainContainer = styled('div')({
    display: 'flex',
    backgroundColor: 'cyan',
    width: '30%',
    height: '100%',
    flexDirection: 'column'
})
const TitleContainer = styled('div')({
    width: '100%',
    height: '50%'
})


function ControlsContainer({roomDetails}) {
  return (
    <MainContainer style={{width: roomDetails?.participants?.length > 3 ? '20%' : '30%'}}>
        <TitleContainer>
            Room code: {roomDetails?.roomCode}
        </TitleContainer>
        <Buttons />
    </MainContainer>
  )
}

const mapStoreStateToProps = ({room}) => {
  return {
    ...room
  }
}

export default connect(mapStoreStateToProps)(ControlsContainer)