import { act } from 'react-dom/test-utils';
import {GROUP} from '../actions/Types';

const INITIAL_STATE = {
    groupList: [],
    currentGroup:null,
}

export const groupReducers = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case GROUP.CREATE:
            return{
                ...state,
                groupList:[...state.groupList,action.payload]
            }

        case GROUP.GET:
            return {
                ...state,
                groupList:[...state.groupList,action.payload]
            }
        case GROUP.CURRENT_GROUP:
            return {
                ...state,
                currentGroup:action.payload,
            }
        case GROUP.EMPTY:
            return{
                ...state,
                groupList:[],
            }

        case GROUP.UPDATE_MEMBER:
            return{
                ...state,
                groupList:[...state.groupList.filter(gp=>{
                    return gp.groupId !== action.payload.groupId;
                }),action.payload]
            }
        default:return state;
    }
}