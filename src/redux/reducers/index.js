import {combineReducers} from 'redux';
import {registerUserReducer,loginUserReducer} from './UserReducer';
import {themeReducer} from './GeneralReducer';

const appReducer = combineReducers({
    authUser:loginUserReducer,
    users:registerUserReducer,
    theme:themeReducer,
});

const rootReducer = (state,action) => {
    return appReducer(state,action);
}
export default rootReducer;