import { USER } from "../actions/Types";

export const registerUserReducer =  (state = [], action ) => {
    switch (action.type){
        case USER.REGISTER:
            return [...state,action.payload]
        case USER.LOGIN:
            return [...state,action.payload]
        default: return state;
    }
}

export const loginUserReducer = (state = [] , action ) => {
    switch (action.type) {
        case USER.LOGIN:
            return [...state,action.payload]
        default: return state;
    }
}