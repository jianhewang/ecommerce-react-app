import { UserActionTypes } from "./user.types";

// at first fire, we might not have a state
const INITIAL_STATE = {
    currentUser: null
}

// return actual state
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return{
                // everything on the state
                ...state,
                // state to modify
                currentUser: action.payload
            }
            
        default:
            return  state;
    }
}

export default userReducer;