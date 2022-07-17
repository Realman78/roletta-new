import React, { useEffect } from 'react'
import { styled } from '@mui/system'
import ContentWrapper from './LandingPage/ContentWrapper'
import { connect } from 'react-redux'
import { getActions } from '../store/actions/authActions'
import { getActions as getActionsRoom } from '../store/actions/roomActions'
import { connectSocket } from '../rtc/socketConnection'
import { randomizer } from '../utils/util'

const MainContainer = styled('div')({
  width: '100%',
  height: '90%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

function LandingPage({ setUserId, userId, getScheduledRooms }) {

  useEffect(() => {
    if (!userId) {
      if (localStorage.getItem('UID')) {
        setUserId(localStorage.getItem('UID'))
        return
      }
      const uid = randomizer(6) + (new Date()).getTime()
      setUserId(uid)
      localStorage.setItem('UID', uid)
    }
    if (userId) {
      connectSocket(userId)
      getScheduledRooms(userId)
    }
  }, [setUserId, userId, getScheduledRooms])

  return (
    <MainContainer>
      <ContentWrapper />
    </MainContainer>
  )
}

const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch),
    ...getActionsRoom(dispatch)
  }
}

const mapStoreStateToProps = ({ auth }) => {
  return {
    ...auth
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(LandingPage)