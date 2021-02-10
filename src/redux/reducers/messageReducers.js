import { act } from 'react-dom/test-utils';
import {MESSAGE} from '../actions/Types';

const INITIAL_STATE = {
    sent:[],
    receive:[],
    chat_friend:null,
}

export const messageReducers = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case MESSAGE.SEND_SET_TO_USER:
            return{
                ...state,
                sent:[...state.sent]
            }
        case MESSAGE.FETCH_MESSAGE_LIST:
            return {
                ...state,
                sent:[...state.sent,action.payload]
            }
        case MESSAGE.RECEIVE_MESSAGE:
            return{
                ...state,
                receive:[...state.receive,action.payload]
            }
        case MESSAGE.NO_MESSAGE_SENT:
            return{
                ...state,
                sent:[]
            }
        case MESSAGE.NO_MESSAGE_RECEIVE:
            return{
                ...state,
                receive:[],
            }
        case MESSAGE.SET_CURRENT_CHAT_FRIENT:
            return{
                ...state,
                chat_friend:action.payload,
            }
        default:return state;
    }
}