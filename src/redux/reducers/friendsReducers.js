import { FRIENDS } from "../actions/Types";

const INITIAL_STATE = {
    friend_search:[],
    friends_list:[],
}

export const friendsReducers = (state = INITIAL_STATE,action) => {

    switch (action.type) {
        case FRIENDS.SEARCH.LIST:
            return{
                ...state,
                friend_search:[action.payload]
            }
            
        case FRIENDS.SUCCESS_ADD_FRIEND:
            return{
                ...state,
                friends_list:[...state.friends_list,action.payload]
            }
        
        default:return state;
    }

}