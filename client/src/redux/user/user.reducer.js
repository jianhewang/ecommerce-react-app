import UserActionTypes from "./user.types";

// at first fire, we might not have a state
const INITIAL_STATE = {
    currentUser: null,
    error: null
}

// return actual state
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case UserActionTypes.SET_CURRENT_USER:
        //     return{
        //         // everything on the state
        //         ...state,
        //         // state to modify
        //         currentUser: action.payload
        //     }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return  state;
    }
}

export default userReducer;