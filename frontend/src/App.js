import React from 'react';
import './App.css';
import { styled } from '@mui/system'
import { connect } from 'react-redux'
import Header from './components/Header';
import Call from './components/Call';
import LandingPage from './components/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Wrapper = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  // background: 'url(https://p7.hiclipart.com/preview/553/918/453/line-curve-curve-lines.jpg)',
  backgroundRepeat: 'no-repeat'
})

function App({ isUserInRoom }) {
  return (
    <>
      <Wrapper>
        <Header />
        {isUserInRoom ? <Call /> : <LandingPage />}
      </Wrapper>
      <ToastContainer />
    </>
  );
}

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room
  }
}

export default connect(mapStoreStateToProps)(App);
