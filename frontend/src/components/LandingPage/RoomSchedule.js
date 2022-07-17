import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import { randomizer } from '../../utils/util'

const MainContainer = styled('div')({
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px'
})

const InfoWrapper = styled('div')({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
    // justifyContent: 'center'
})

const Up = styled('div')({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px'
    // justifyContent: 'center'
})

function RoomSchedule({ isChecked, setIsChecked, schedulingRoomCode, setSchedulingRoomCode }) {

    const handleCheckbox = e => {
        setIsChecked(!isChecked)
        setSchedulingRoomCode(randomizer(8))
    }
    return (
        <MainContainer>
            <FormControlLabel style={{width: 'fit-content'}} control={<Checkbox onChange={handleCheckbox} checked={isChecked} />} label="Schedule Room" />
            {isChecked && <InfoWrapper>
                <Up>
                    <Typography >
                        ROOM CODE:
                    </Typography>
                    <Typography sx={{ fontSize: '24px', marginLeft: '10px' }}>
                        {schedulingRoomCode}
                    </Typography>
                </Up>
                <Typography sx={{fontSize: '12px'}}>
                    *Room will be closed automatically after 72 hours OR when the last person in that room leaves.
                </Typography>
            </InfoWrapper>}
        </MainContainer>
    )
}

export default RoomSchedule