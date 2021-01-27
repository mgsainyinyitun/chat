import { USER } from "./Types"

export const registerUser = (info) => {
    return {
        type:USER.REGISTER,
        payload:info,
    }
}