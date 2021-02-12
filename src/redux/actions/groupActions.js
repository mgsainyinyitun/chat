import {db,fv} from '../../firebase';
import {GROUP} from './Types';


export const createNewGroup = (data) => dispatch => {
    const ref = db.collection("groups").doc();
    data.groupId = ref.id;
    return ref.set(data).then(()=>{
        console.log("successfully create group");
    })
    .catch (err => {
        console.log("error in c-group:",err);
    })
}

export const addMemberToGroups = (group,memberId) => dispatch =>{
    const ref = db.collection("groups").doc(group.groupId);
    return ref.update({
        members:fv.arrayUnion(memberId),
    }).then(()=>{
        group.members.push(memberId);
        console.log("New Group Memeber :::....",group);
        dispatch(updateGroupMember(group));
        console.log("update successsssss....");
    }).catch((err) => {
        console.log("ERRRRR:",err);
    })
}


export const getUserRelatedGroupsNotRealTime = (user) => dispatch =>{
    const ref = db.collection('groups').where("members","array-contains",user.uid);
    return ref.get().then(groups =>{
        if(!groups.empty){
            groups.forEach(group => {
                console.log("Receive Groups:",group.data());
                dispatch(getUserRelatedGroupsSuccess(group.data()))
            })
        }else{
            console.log("Group is empty");
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
            }) // End forEach
            console.log("Final Group is empty:");
            dispatch(emptyRelatedGroupList());
            console.log("Final Group is Added Again:");
            dispatch(getUserRelatedGroupsSuccess(Fgroups));

        }else{
            console.log("User is in No Group");
        }
    })
}

export const getUserInfoByUid = (uid) => dispatch =>  {
    const ref = db.collection("users").where("uid","==",uid);
    return ref.get().then( (doc) => {
        console.log("USER INFO::",doc.data());
    }).catch(err =>{
        console.log("ERR:In:",err);
    })
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