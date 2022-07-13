import React, { useEffect } from 'react'
import { styled } from '@mui/system'
import ContentWrapper from './LandingPage/ContentWrapper'
import { connect } from 'react-redux'
import { getActions } from '../store/actions/authActions'
import { connectSocket } from '../rtc/socketConnection'

const MainContainer = styled('div')({
  width: '100%',
  height: '90%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

function LandingPage({ setUserId, userId }) {

  useEffect(() => {
    if (!userId) setUserId('id' + (new Date()).getTime())
    if (userId) connectSocket(userId)
  }, [setUserId, userId])

  return (
    <MainContainer>
      <ContentWrapper />
    </MainContainer>
  )
}

const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch)
  }
}

const mapStoreStateToProps = ({ auth }) => {
  return {
    ...auth
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(LandingPage)