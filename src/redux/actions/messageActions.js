import {db} from '../../firebase';
import {MESSAGE} from './Types';

export const sendMessage = (user,friend,message) => dispatch =>{
    dispatch(insertMessageToUser(user,friend,message));
    dispatch(insertMessageToFriend(user,friend,message));
}

export const insertMessageToUser = (user,friend,message) => dispatch =>{
    const ref_user = db.collection("users").doc(user.docId).collection("messages").doc();
    let temp = {...message};
    temp.mesId = ref_user.id;
    temp.to = friend.uid;
    return ref_user.set(temp).then(()=>{
        console.log("Success sent message");
    })
    .catch(err =>{
        console.log("Error in sent message",err);
    });
}


export const insertMessageToFriend = (user,friend,message) => dispatch => {
    const ref = db.collection("users").doc(friend.docId).collection("messages").doc();
    message.mesId = ref.id;
    message.from = user.uid;
    return ref.set(message).then(()=>{
        console.log("Sccess sent message to friend");
    })
    .catch(err=>{
        console.log("Error in sent msg to friends",err);
    })
}


export const getSentMessage = (user,friend) => dispatch => {
    const ref = db.collection("users").doc(user.docId).collection("messages")
    .where("to","==",friend.uid)
    return ref.get().then(docs =>{
        if(!docs.empty){
            docs.forEach(doc=>{
                dispatch(fetchSentMessageSuccess(doc.data()))
            })
        }else{
            console.log("Message is empty?",docs.empty)
            dispatch(emptySentMessageState());
        }
    })
    .catch(err =>{
        console.log("error getting message",err);
    })
}

export const getRealTimeSentMessage = (user,friend) => dispatch =>{
    const ref = db.collection("users").doc(user.docId).collection("messages")
        .where("to","==",!undefined);
        return ref.onSnapshot(snapshot =>{
            if(!snapshot.empty){
                snapshot.docChanges().forEach(change =>{
                    dispatch(fetchSentMessageSuccess(change.doc.data()));
                })
            }else{
                console.log("Message is empty");
                dispatch(emptySentMessageState());
            }
        })
}

export const getRealTimeMessages = (user) => dispatch => {
    const ref = db.collection("users").doc(user.docId).collection("messages");
    return ref.onSnapshot(snapshot =>{
        if(!snapshot.empty){
            snapshot.docChanges().forEach(message =>{
                if(message.doc.data().to){
                    dispatch(fetchSentMessageSuccess(message.doc.data()))
                }
                else if(message.doc.data().from){
                    dispatch(insertReceiveMessageToUserSuccess(message.doc.data()))
                }
            })
        }
    })
}

export const getRealTimeReceivedMessage = (user,friend) => dispatch => {
    const ref = db.collection("users").doc(user.docId).collection("messages")
        .where("from","==",!undefined);
        return ref.onSnapshot(snapshot => {
            if(!snapshot.empty){
                snapshot.docChanges().forEach(change => {
                    dispatch(insertReceiveMessageToUserSuccess(change.doc.data()));
                })
            }else{
                console.log("No Receive message:");
                dispatch(emptyReceivedMessageState());
            }
        })
}



export const getReceiveMessage = (user,friend) => dispatch => {
    const ref = db.collection("users").doc(user.docId).collection("messages")
    .where("from","==",friend.uid); 
    return ref.get().then(docs =>{
        if(!docs.empty){
            docs.forEach(doc=>{
                dispatch(insertReceiveMessageToUserSuccess(doc.data()));
            })
        }else{
            console.log("No Receive Message:",docs.empty)
            dispatch(emptyReceivedMessageState());
        }
    })
}


export const insertMessageToUserSuccess = (message) => {
    return {
        type:MESSAGE.SEND_SET_TO_USER,
        payload:message,
    }
}

export const fetchSentMessageSuccess = (message) =>{
    return {
        type:MESSAGE.FETCH_MESSAGE_LIST,
        payload:message,
    }
}

export const insertReceiveMessageToUserSuccess = (message) =>{
    return {
        type:MESSAGE.RECEIVE_MESSAGE,
        payload:message,
    }
}

export const emptySentMessageState = () => {
    return {
        type:MESSAGE.NO_MESSAGE_SENT,
    }
}

export const emptyReceivedMessageState = () => {
    return {
        type:MESSAGE.NO_MESSAGE_RECEIVE,
    }
}

export const setCurrentChatFriend = (friend) =>{
    return {
        type:MESSAGE.SET_CURRENT_CHAT_FRIENT,
        payload:friend,
    }
}