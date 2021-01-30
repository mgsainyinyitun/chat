import { USER } from "./Types"
import {auth} from '../../firebase';
import history from "../../history";

export const registerUser = (info) => {
    return {
        type:USER.REGISTER,
        payload:info,
    }
}

export const loginUser = (info) => {
    console.log("Info is ::",info);
    console.log("Current User",auth.currentUser);

    return function (dispatch){
        auth.signInWithEmailAndPassword(info.email,info.password)
        .then(async (userCredential) => {
            let uid = await userCredential.user.uid; 
            dispatch({
                type:USER.LOGIN,
                payload:uid,
            }) 
        })
        .then(() => {
            history.push('/');
        })
        .catch((error) => {
            console.log("Login Error",error);
        })
    }
    // auth.signInWithEmailAndPassword(info.email,info.password)
    // .then((userCredential) => {
    //     console.log("User ID of Login User:",userCredential.user.uid);
    //     return {
    //         type:USER.LOGIN,
    //         payload:userCredential.user.uid,
    //     }
    // })
    // .catch((error) => {
    //     console.log(error);
    // })
}

