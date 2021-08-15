import { LANGUAGES, THEME } from "../actions/Types";

const INITIAL_STATE = null;

export const themeReducer =  (state = INITIAL_STATE , action) => {
    switch (action.type) {
        case THEME.DARK: return action.theme;
        case THEME.LIGHT: return action.theme;
        case THEME.CHANGE:return action.theme;
        default:return state;
    }
}

export const languageReducer = (state = INITIAL_STATE, action)=> {
    switch (action.type) {
        case LANGUAGES.CHANGE: return action.language;
        case LANGUAGES.GET:return action.language;
        default: return state;
    }
}
