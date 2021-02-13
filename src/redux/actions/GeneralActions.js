import { db } from '../../firebase';
import {THEME} from './Types';

export const changeTheme = (user,theme) => dispatch => {
    dispatch({
        type:THEME.CHANGE,
        theme:theme,
    })
    const ref = db.collection("users").doc(user.docId);
    return ref.update({
        theme:theme,
    }).then(()=>{
        console.log("Change theme Theme Success!");
        
    })
}

export const getUserSaveTheme = (user) => dispatch => {
    const ref = db.collection("users").doc(user.docId);
    return ref.get().then(doc =>{
        console.log('Theme::',doc.data());
        dispatch({
            type:THEME.CHANGE,
            theme:doc.data().theme,
        })
    })
    .catch(err =>{
        console.log('get error:',err);
    })
}



export const changeLightTheme = () => {
    return {
        type:THEME.LIGHT,
        theme:'light',
    }
}