import { USER } from "./Types"
import {auth,db, fb} from '../../firebase';
import history from "../../history";
import {
    getFriendsList,
    getFriendsRequestList,
    getRealTimeMessages,
    getUserSaveTheme,
    getUserRelatedGroupsNotRealTime,
} from "../actions";

//  export const  OnAuthStateChanged = () => {
//      console.log("Call for onAuthSateChanged")
//      let authUser;
//      return async (dispatch) => {
//             auth.onAuthStateChanged((user) => {
//             if(user){
//                  console.log("User is ::",user);
//                  authUser = user;
//                  dispatch({
//                      type:USER.LOGIN,
//                      payload:{user}
//                  })
//                  getUserProfile(user.uid,dispatch);
//              }else{
//                 console.log("else else else ...")
//              }
//          } )
         
//      }
//      return Promise.resolve();
//  };

// export const onAuthStateChanged = () => (dispatch) => {
// 	auth.onAuthStateChanged(async (user) => {
// 		if (user) {
// 			console.log("onAuthStateChanged: ", user);
// 			console.log("Call for onAuthStateChanged");

// 			dispatch({
// 				type: USER.LOGIN,
// 				payload: { user },
// 			});

// 		} else {
// 			// leave as type: SIGNED_OUT or will get infinite loop
// 			//dispatch({ type: SIGNED_OUT });
// 		}
//     })
// 	return Promise.resolve();
// };

export const onAuthStateChanged = ()  =>  dispatch => {
    return  fb.auth().onAuthStateChanged((user) => {
        if(user){
            dispatch({
                type:USER.LOGIN,
                payload:{user}
            })
            getUserProfile(user.uid)
        }else{
            dispatch({type:USER.SIGNOUT})
        }
    });
    
}

export const onAuthStateChangedSecond = () => (dispatch) => {
    console.log("Call for on Auth state change:");
    fb.auth().onAuthStateChanged(async (user) => {
        if(user) {
            dispatch({
                type:USER.LOGIN,
                payload:{user}
            })
            console.log("user ID is:::",user.uid);
            dispatch(getUserProfile(user.uid));
        }else{
            dispatch({type:USER.SIGNOUT})
        }
    });
    return Promise.resolve();
}

export const getUserMetaData = (user)  => dispatch => {
    let sD = {
        uid:user.uid,
        username:user.username,
        email:user.email,
    }
    dispatch(getUserSaveTheme(user));
    dispatch(getFriendsRequestList(user.docId));
    dispatch(getFriendsList(user.docId));
    dispatch(getRealTimeMessages(user));
    dispatch(getUserRelatedGroupsNotRealTime(sD));
}

export const loginUser = (info) => {
    let authUser;
    return function (dispatch){
        auth.signInWithEmailAndPassword(info.email,info.password)
        .then(async (userCredential) => {
            authUser = await userCredential.user; 
            dispatch({
                type:USER.LOGIN,
                payload:authUser,
            }) 
        })
        .then(()=> getUserProfile(authUser.uid))
        .then(() => {
            history.push('/');
        })
        .catch((error) => {
            console.log("Login Error",error);
            return dispatch(onLoginError(error));
        })
    }
}


export const onLoginError = (error) => {
    return{
        type:USER.LOGIN_ERROR,
        payload:error,
    }  
}

const SignUpSetUserProfile = (data)  => {
    const ref = db.collection("users").doc();
    data.docId = ref.id;
    return ref.set(data).then(()=>{
        console.log("successfully write user profile");
    })
    .catch(err=>{
        console.log("error in writing user profile",err);
    })
}


export const getUserDataWithDocId = (docId) => dispatch =>{
    const ref = db.collection("users").doc(docId);
    return ref.get().then(data =>{
        console.log("Got data")
        console.log(data);
    })
    .catch(err =>{
        console.log("err in get data:",err);
    })
}




export const getUserProfile = (uid) => dispatch => {
    console.log("UID to get::",uid);
    let user = null;
    const ref = db.collection("users").where("uid","==",uid)
    return ref.get().then( docs =>{
        docs.forEach(doc=>{
            console.log("user data is:::",doc.data());
            user = doc.data();
            dispatch({
                type:USER.SETPROFILEDATA,
                payload:doc.data()
            })
        })    
    })
    .then(()=>{
        dispatch(changeFetchingState(true));
    })
    .then(()=>{
        history.push('/');
    })
    .then(() => {
         dispatch(getUserMetaData(user));
    })
    .catch(err=>{
        console.log("Get user data error",err);
    })
}
export const SignUp = (info) => {
    let data = {
        email:info.email,
        username:info.username,
        created:new Date(),
        phone:info.phone,
    }
    let createdUser;
    return (dispatch) => {
        auth.createUserWithEmailAndPassword(info.email,info.password)
        .then( async (userCredential) => {
            createdUser = await userCredential.user;
            console.log("Created User uid::",createdUser.uid);
            data.uid = createdUser.uid;
            console.log("DATA after created :",data);
            dispatch({
                type:USER.REGISTER,
                payload:createdUser,
            })
        })
        .then(()=> SignUpSetUserProfile(data))
        .then(()=>{
            history.push('/login');
        })
        
        .catch((error)=>{
            console.log("Register Error::",error);
        })
    }
}


export const SignOut = () => {
     return (dispatch) => {
        auth.signOut().then(()=>{
           console.log("SignOut successfully");
           dispatch({
                type:USER.SIGNOUT,
            })
        })
         .catch(err =>{
             console.log("SignOut Error",err);
         })
     }
 }

export const changeFetchingState = (state) => {
    return {
        type:USER.DATA_FETCHING_CHANGE,
        payload:state,
    }
}