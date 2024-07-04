import { ResponseType } from "api/todolist-api"
import { instance } from "common"
import { LoginType } from "components/Login/Login"


export const authAPI = {
    loginMe() {
        return instance.get<ResponseType<UserDataType>>('auth/me')
    },
    login(data: LoginType) {
        return instance.post<ResponseType<{ userId: number }>>('auth/login', data)
    },
    logOut() {
        return instance.delete<ResponseType>('auth/login')
    },
}


export type UserDataType = {
    id: number
    email: string
    login: string
}





