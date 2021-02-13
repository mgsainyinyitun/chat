import {db,fv} from '../../firebase';
import {GROUP} from './Types';


export const createNewGroup = (data) => dispatch => {
    const ref = db.collection("groups").doc();
    data.groupId = ref.id;
    return ref.set(data).then(()=>{
        console.log("successfully create group");
        dispatch({
            type:GROUP.CREATE,
            payload:data,
        })
    })
    .catch (err => {
        console.log("error in c-group:",err);
    })
}

export const addMemberToGroups = (group,member) => dispatch =>{
    const ref = db.collection("groups").doc(group.groupId);
    return ref.update({
        members:fv.arrayUnion(member),
    }).then(()=>{
        group.members.push(member);
        dispatch(updateGroupMember(group));
    }).catch((err) => {
        console.log("ERRRRR:",err);
    })
}


export const getUserRelatedGroupsNotRealTime = (user) => dispatch =>{
    console.log("User to get group is:::",user);
    const ref = db.collection('groups').where("members","array-contains",user);
    return ref.get().then(groups =>{
        if(!groups.empty){
            let gps = [];
            groups.forEach(group => {
                gps.push(group.data());
                dispatch(getRealTimeGroupMessage(group.data()))
            });
            dispatch(getUserRelatedGroupsSuccess(gps));
        }else{
            console.log("Group is empty");
        }
    })
}

export const getRealTimeGroupMessage = (group) => dispatch =>{
    const ref = db.collection('groups').doc(group.groupId).collection('messages');
    return ref.onSnapshot(messages => {
        if(!messages.empty){
            messages.docChanges().forEach(message => {
                dispatch(getRealTimeGroupMessageSuccess(message.doc.data()));
            })
        }
    })
}


export const getUserRelatedGroups = (user) => dispatch => {
    const ref = db.collection("groups")
    .where("members","array-contains",user.uid);
    let Fgroups = [];
    return ref.onSnapshot(groups => {
        if(!groups.empty){
            groups.docChanges().forEach(group => {
              //  dispatch(getUserRelatedGroupsSuccess(group.doc.data()))
                Fgroups.push(group.doc.data());
            }) 
            
            dispatch(emptyRelatedGroupList());
            dispatch(getUserRelatedGroupsSuccess(Fgroups));

        }else{
            console.log("User is in No Group");
        }
    })
}

export const getUserInfoByUid = (uid) => dispatch =>  {
    const ref = db.collection("users").where("uid","==",uid);
    return ref.get().then((docs) => {
        if(!docs.empty){
            docs.forEach(doc =>{
                dispatch(getUserInfoByUidSuccess(doc.data()));
            })
        }
    }).catch(err =>{
        console.log("ERR:In:",err);
    })
}


export const sendGroupMessage = (id,message) => dispatch => {
    const ref = db.collection("groups").doc(id).collection("messages").doc();
    message.mesId = ref.id;
    return ref.set(message).then(()=>{
        console.log("successfully sent group message:");
    })
    .catch(err =>{
        console.log("err in sent group message:",err);
    })
}




export const getUserInfoByUidSuccess = (member) => {
    return {
        type:GROUP.GET_MEMBER_INFO,
        payload:member,
    }
}

export const getUserRelatedGroupsSuccess = (group) => {
    return {
        type:GROUP.GET,
        payload:group,
    }
}

export const setCurrentGroup = (group) => {
    return {
        type:GROUP.CURRENT_GROUP,
        payload:group,
    }
}

export const emptyRelatedGroupList = () =>{
    return{
        type:GROUP.EMPTY,
    }
}

export const updateGroupMember = (group) => {
    return {
        type:GROUP.UPDATE_MEMBER,
        payload:group,
    }
}

export const getRealTimeGroupMessageSuccess = (message) => {
    return {
        type:GROUP.GROUP_MESSAGES_GET,
        payload:message,
    }

}