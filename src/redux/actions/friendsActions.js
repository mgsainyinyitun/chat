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


export const addFriend = (friend,user) => dispatch => {
    const ref = db.collection("users").doc(user.docId).collection("friends").doc();
    friend.friDoc = ref.id;
    return ref
        .set(friend)
        .then(()=>{
            console.log("successfull add friend");
            dispatch(addFriendSuccess(friend));
            dispatch(addFriendRequest(friend,user));
        })
        .catch(err =>{
            console.log("error add friend",err);
        })
}

export const editFriendsData = (user) => dispatch =>{
    const ref = db.collection("users").doc(user.docId).collection("friends").doc(user.friDoc);
    return ref.update(user).then(()=>{
        console.log("Successfully update");
        dispatch(editFriendsDataSuccess(user));
    })
    .catch(err =>{
        console.log("Error Update",err);
    })
}

export const addFriendRequest = (friend,user) => dispatch => {
    console.log("ADD TO FRI REQUEST")
    const ref = db.collection("users").doc(friend.docId).collection("friendsReq").doc()
    user.status = "pending";
    user.friReqDoc = ref.id;
    return ref
        .set(user)
        .then(()=>{
            console.log("successfully add friend request list");
            dispatch(addFriendRequestList(friend));
        })
        .catch(err =>{
            console.log("err in add friReq List",err);
        })
}

export const removeFriendRequest = (friend,user) => dispatch =>{
    return db.collection("users")
        .doc(user.docId)
        .collection("friendsReq")
        .doc(user.friReqDoc)
        .delete().then(()=>{
            console.log("Successfully delete");
            dispatch(removeFriendRequestSuccess(friend));
        })
}

export const getFriendsList =  (docId) => dispatch =>{
    console.log("Getting friends list")
    db.collection("users")
        .doc(docId)
        .collection("friends")
        .get().then( docs => {
            docs.forEach(doc =>{
                console.log("Friends Data:",doc.data());
                dispatch(addFriendSuccess(doc.data()));
            })
        })
        .catch(err=>{
            console.log("Error get friends",err);
        })
}

export const getFriendsRequestList = (docId) => dispatch => {
    console.log('Getting friends Request List');
    return db.collection("users")
        .doc(docId)
        .collection("friendsReq")
        .get().then(docs =>{
            docs.forEach(doc =>{
                console.log("Add friends req List",doc.data());
                dispatch(addFriendRequestList(doc.data()))
            })
        })
        .catch(err =>{
            console.log("Error in get Friends List",err);
        })
}

export const addFriendSuccess = (friend) => {
    return {
        type:FRIENDS.SUCCESS_ADD_FRIEND,
        payload:friend,
    }
}

export const addFriendRequestList = (friend) => {
    return {
        type:FRIENDS.SUCCESS_ADD_FRIEND_REQUEST,
        payload:friend,
    }

}
export const removeFriendRequestSuccess = (friend) =>{
    return{
        type:FRIENDS.REMOVE_FRIEND_REQUEST,
        payload:friend,
    }
}
export const editFriendsDataSuccess = (user) =>{
    return{
        type:FRIENDS.EDIT_FRIEND_DATA,
        payload:user,
    }
}