import { USER } from "./Types"
import {auth,db, fb} from '../../firebase';
import history from "../../history";

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

export const onAuthStateChanged = ()  => dispatch => {
    return  fb.auth().onAuthStateChanged(async (user) => {
        if(user){
            console.log("onAuthStateChanged: ",user);
            console.log("onAuthStateChanged: uid",user.uid);
            dispatch({
                type:USER.LOGIN,
                payload:{user}
            })
            await getUserProfile(user.uid,dispatch);
        
        }else{
            console.log("no user");
            dispatch({type:USER.SIGNOUT})
        }
    });
}



export const loginUser = (info) => {
    console.log("Info is ::",info);
    console.log("Current User",auth.currentUser);
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
        .then(()=> getUserProfile(authUser.uid,dispatch))
        .then(() => {
            history.push('/');
        })
        .catch((error) => {
            console.log("Login Error",error);
        })
    }
}




const SendEmailVerification = (auth) => {
    let user = auth.currentUser;
    user.sendEmailVerification().then(function() {
        console.log('email verification sent');
    }).catch(err => {
        console.log(err);
    })
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

export const getUserProfile = (uid,dispatch) =>{
    console.log("UID to get::",uid);
    const ref = db.collection("users").where("uid","==",uid)
    return ref.get().then( docs =>{
        docs.forEach(doc=>{
            console.log(doc.data());
            dispatch({
                type:USER.SETPROFILEDATA,
                payload:doc.data()
            })
        })
        
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


