import { act } from "react-dom/test-utils";
import { USER } from "../actions/Types";

const INITIAL_STATE = {
    user:{
        data:null,
    },
    errors:null,
    fetching:true,
    btnLoading:false,
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
        case USER.LOGIN_ERROR:
            return {
                ...state,
                errors:action.payload,
            }
        case USER.DATA_FETCHING_CHANGE:
            return {
                ...state,
                fetching:action.payload,
            }
        case USER.LOGIN_BTN_LOADING:
            return{
                ...state,
                btnLoading:action.payload,
            }
        case USER.EDIT_PROFILE:
            return{
                ...state,
                User:{
                    data:action.payload,
                }
            }
        default: return state;
    }
}