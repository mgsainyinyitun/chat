import { FRIENDS } from "../actions/Types";

const INITIAL_STATE = {
    friend_search:[],
    friends_list:{
        data:[],
    }
}

export const friendsReducers = (state = INITIAL_STATE,action) => {

    switch (action.type) {
        case FRIENDS.SEARCH.LIST:
            return{
                ...state,
                friend_search:[action.payload]
            }
        
        default:return state;
    }

}