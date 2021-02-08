import { FRIENDS } from "../actions/Types";

const INITIAL_STATE = {
    friend_search:[],
    friends_list:[],
    friends_request:[],
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
        case FRIENDS.SUCCESS_ADD_FRIEND_REQUEST:
            return{
                ...state,
                friends_request:[...state.friends_request,action.payload]
            }
        case FRIENDS.REMOVE_FRIEND_REQUEST:
            return{
                ...state,
                friends_request:[...state.friends_request.filter(obj=>obj.uid !== action.uid)]
            }
        case FRIENDS.EDIT_FRIEND_DATA:
            return{
                ...state,
                friends_list:[...state.friends_list.filter(obj=> obj.uid !== action.uid),action.payload]
            }

        default:return state;
    }

}