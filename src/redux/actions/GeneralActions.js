import {THEME} from './Types';

export const changeDarkTheme = () => {
    return {
        type:THEME.DARK,
        theme:'dark',
    }
}

export const changeLightTheme = () => {
    return {
        type:THEME.LIGHT,
        theme:'light',
    }
}