import { THEME } from "../actions/Types";

export const themeReducer =  (state = [] , action) => {
    switch (action.type) {
        case THEME.DARK: return [...state,action.theme];
        case THEME.LIGHT: return [...state,action.theme];
        default:return state;
    }
}