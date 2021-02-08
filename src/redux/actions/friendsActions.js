import {fb,db} from '../../firebase';
import { FRIENDS } from './Types';


export const fetchUserByEmail = (email) =>{
    const ref = db.collection("users").where("email","==",email);
    return function (dispatch) {
        ref.get().then((docs)=>{
            console.log("Docs is data");
            docs.forEach(doc=>{
                console.log(doc.data());
                dispatch({
                    type:FRIENDS.SEARCH.LIST,
                    payload:doc.data(),
                })
            })
        })
        .catch(err=>{
            console.log("Error in get friends data::",err);
        })
        
    } 
}


export const addFriend = (friend,docId) => dispatch => {
    db.collection("users")
        .doc(docId)
        .collection("friends")
        .add(friend)
        .then(()=>{
            console.log("successfull add friend");
            dispatch(addFriendSuccess(friend));
        })
        .catch(err =>{
            console.log("error add friend",err);
        })
}

export const addFriendSuccess = (friend) => {
    return {
        type:FRIENDS.SUCCESS_ADD_FRIEND,
        payload:friend,
    }
}

