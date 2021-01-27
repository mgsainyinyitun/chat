import { USER } from "../actions/Types";

export default (state = [], action ) => {
    switch (action.type){
        case USER.REGISTER:
            return [...state,action.payload]
        default: return state;
    }
}