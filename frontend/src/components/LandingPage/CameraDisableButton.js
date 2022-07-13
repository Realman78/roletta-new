import React from 'react'
import { styled } from '@mui/system'

const MainContainer = styled('div')({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})
function CameraDisableButton({audioOnly, handleAudioOnlyChange}) {
    return (
        <MainContainer>
            <button onClick={handleAudioOnlyChange}>{audioOnly ? 'Camera disabled' : 'Camera enabled'}</button>
        </MainContainer>
    )
}

export default CameraDisableButton