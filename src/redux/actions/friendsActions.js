import {db} from '../../firebase';
import { deleteAllFriendMessageSuccess } from './messageActions';
import { FRIENDS, MESSAGE } from './Types';


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

export const addFriend = (friend,user,mode) => dispatch => {
    const ref = db.collection("users").doc(user.docId).collection("friends").doc();
    friend.friDoc = ref.id;
    return ref
        .set(friend)
        .then(()=>{
            dispatch(addFriendSuccess(friend));
            if(mode ==='NOT_ACCEPT'){
                dispatch(addFriendRequest(friend,user));
            }else{
                console.log('Accept Friends Mode');
            }
        })
        .catch(err =>{
            console.log("error add friend",err);
        })
}


export const unFriend = (friend,user) => dispatch => {
    const ref = db.collection("users").doc(user.docId).collection("friends").doc(friend.friDoc);
    return ref.delete()
        .then(()=>{
            console.log("Delete friends data successfully");
            dispatch({
                type:FRIENDS.UNFRIEND,
                payload:friend,
            })
            dispatch(unFriendFriendSide(friend,user));
            // User Side
            // Need to delete Message To-friend uid
            // Need to delete Messsage from- friend uid
            // Friend Side
            // Need to delete Message To- User uid
            // Need to delete Message From - User uid
        })
        .catch(err => {
            console.log("error in unfriend:",err);
        });
}

export const unFriendFriendSide = (friend,user) => dispatch => {
    const ref = db.collection("users").doc(friend.docId).collection("friends");
    return ref.get().then(docs => {
        docs.forEach(doc => {
            let temp = doc.data();
            if(temp.uid === user.uid){
                doc.ref.delete().then(()=>{
                    console.log("successfully delete in friends side")
                });
            }
        });
        dispatch(deleteAllFriendMessage(friend,user));
    })
}

export const deleteAllFriendMessage = (friend,user) => dispatch => {
    const ref = db.collection("users").doc(user.docId).collection("messages");
    return ref.get().then(docs => {
        docs.forEach(doc => {
            let tempMessage = doc.data();
            if(tempMessage.to === friend.uid || tempMessage.from === friend.uid){
                doc.ref.delete().then(()=>{
                    console.log("Deleted!");
                });
            }
        });
        dispatch(deleteAllFriendMessageSuccess(friend));
        dispatch(deleteAllUserMessage(friend,user));
    })
}

export const deleteAllUserMessage = (friend,user) => dispatch => {
    const ref = db.collection("users").doc(friend.docId).collection("messages");
    return ref.get().then(docs => {
        docs.forEach(doc => {
            let tempMessage = doc.data();
            if(tempMessage.to === user.uid || tempMessage.from === user.uid){
                doc.ref.delete().then(()=>{
                    console.log("Deleted!");
                })
            }
        });
        window.location.reload();
    })
}



export const addFriendRequest = (friend,user) => dispatch => {
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

export const editFriendsData = (user,friend) => dispatch =>{
    const ref = db.collection("users").doc(user.docId)
        .collection("friends");
    return ref.get().then((docs) =>{
        docs.forEach((doc)=>{
            let user = doc.data();
            user.status = "friend";
            console.log(user);
            if(user.uid === friend.uid){
                console.log('same person update data');
                doc.ref.update({
                    status:"friend",
                })
                dispatch(editFriendsDataSuccess(user));
                console.log('same person update data');
            }
        })
    })
    .catch(err =>{
        console.log("Error Update",err);
    })
}


export const removeFriendRequest = (friend,user) => dispatch =>{
    return db.collection("users")
        .doc(user.docId)
        .collection("friendsReq")
        .doc(friend.friReqDoc)
        .delete().then(()=>{
            console.log("Successfully delete");
            dispatch(removeFriendRequestSuccess(friend));
        })
}

export const getFriendsList =  (docId) => dispatch =>{
    db.collection("users")
        .doc(docId)
        .collection("friends")
        .get().then( docs => {
            let friends = [];
            docs.forEach(doc =>{   
                friends.push(doc.data()); 
            })
            dispatch(getFriendsListSuccess(friends));
        })
        .catch(err=>{
            console.log("Error get friends",err);
        })
}

export const getFriendsRequestList = (docId) => dispatch => {
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

export const getFriendsListSuccess = (friends) => {
    return {
        type:FRIENDS.GET_FRIENDS_LIST,
        payload:friends,
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