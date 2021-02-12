import {combineReducers} from 'redux';
import {UserAuthReducer} from './UserReducer';
import {themeReducer} from './GeneralReducer';
import {friendsReducers} from './friendsReducers';
import {messageReducers} from './messageReducers';
import {groupReducers} from'./groupReducers';

const appReducer = combineReducers({
    authUser:UserAuthReducer,
    friend:friendsReducers,
    theme:themeReducer,
    message:messageReducers,
    groups:groupReducers,
});

const rootReducer = (state,action) => {
    return appReducer(state,action);
}
export default rootReducer;