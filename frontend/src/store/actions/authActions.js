export const authActions = {
    SET_USER_ID: 'AUTH.SET_USER_ID',
}

export const getActions = dispatch => {
    return {
        setUserId: userId => dispatch(setUserId(userId))
    }
}
export const setUserId = (userId) => {
    return {
        type: authActions.SET_USER_ID,
        userId
    }
}