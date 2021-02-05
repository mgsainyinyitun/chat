import { USER } from "../actions/Types";

const INITIAL_STATE = {
    user:{
        data:null,
    }
}

export const UserAuthReducer = (state = INITIAL_STATE , action ) => {
    switch (action.type) {
        case USER.LOGIN:
            return action.payload;
        case USER.REGISTER:
            return action.payload;
        case USER.SIGNOUT:
            return state;
        case USER.SETPROFILEDATA:
            return {
                ...state,
                user:{
                    data:action.payload
                }
            }
        default: return state;
    }
}