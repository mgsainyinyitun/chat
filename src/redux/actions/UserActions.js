import { USER } from "./Types"

export const registerUser = (info) => {
    return {
        type:USER.REGISTER,
        payload:info,
    }
}

export const loginUser = (info) => {
    return {
        type:USER.LOGIN,
        payload:info,
    }
}