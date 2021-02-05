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