import {combineReducers} from 'redux';
import {UserAuthReducer} from './UserReducer';
import {themeReducer} from './GeneralReducer';
import { USER } from '../actions/Types';

const appReducer = combineReducers({
    authUser:UserAuthReducer,
    theme:themeReducer,
});

const rootReducer = (state,action) => {
    return appReducer(state,action);
}
export default rootReducer;