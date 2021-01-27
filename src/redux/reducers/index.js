import {combineReducers} from 'redux';
import RegisterUserReducer from './UserReducer';
import {themeReducer} from './GeneralReducer';

const appReducer = combineReducers({
    users:RegisterUserReducer,
    theme:themeReducer,
});

const rootReducer = (state,action) => {
    return appReducer(state,action);
}
export default rootReducer;