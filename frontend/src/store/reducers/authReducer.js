import { authActions } from "../actions/authActions";

const initState = {
    userId: null,
}

const reducer = (state=initState, action)=>{
    switch(action.type){
        case authActions.SET_USER_ID:
            return {
                userId: action.userId
            }
        default:
            return state
    }
}

export default reducer