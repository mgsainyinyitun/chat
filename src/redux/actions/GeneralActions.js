import { db } from '../../firebase';
import {THEME,LANGUAGES} from './Types';

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

export const changeLanguage = (user,language) => dispatch => {
    dispatch({
        type:LANGUAGES.CHANGE,
        language:language,
    });
    const ref = db.collection("users").doc(user.docId);
    return ref.update({
        language:language,
    }).then(()=> {
        console.log('Change Language Successfully');
    })
}

export const getUserSaveTheme = (user) => dispatch => {
    const ref = db.collection("users").doc(user.docId);
    return ref.get().then(doc =>{
        dispatch({
            type:THEME.CHANGE,
            theme:doc.data().theme,
        })
    })
    .catch(err =>{
        console.log('get error:',err);
    })
}

export const getSavedLanguage = (user) => dispatch => {
    const ref = db.collection('users').doc(user.docId);
    return ref.get().then(doc=>{
        dispatch({
            type:LANGUAGES.GET,
            language:doc.data().language,
        })
    })
    .catch(err => {
        console.log('get error:',err);
    });
}


export const changeLightTheme = () => {
    return {
        type:THEME.LIGHT,
        theme:'light',
    }
}