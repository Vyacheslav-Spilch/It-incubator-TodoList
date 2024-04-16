import { Dispatch } from 'redux'
import { authAPI } from '../../api/todolist-api'
import {
    SetAppErrorACType,
    setAppStatusAC,
    SetAppStatusACType,
    setIsInitializedAC,
    SetIsInitializedACType,
} from '../../state/app-reducer'
import { RESULT_CODE_RESPONSE } from '../../features/Task/TaskState/tasks-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { LoginType } from './Login'

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}
// actions
type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        value,
    } as const
}
// thunks

export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === RESULT_CODE_RESPONSE.succeeded) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e as { message: string })
    }
}

export const loginMeTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.loginMe()
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(dispatch, e as { message: string })
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}

export const logOutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    setAppStatusAC('loading')
    try {
        const res = await authAPI.logOut()
        if (res.data.resultCode === RESULT_CODE_RESPONSE.succeeded) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsLoggedInAC(false))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e as { message: string })
    }
}

// types
type ActionsType =
    | SetIsLoggedInACType
    | SetAppStatusACType
    | SetAppErrorACType
    | SetIsInitializedACType
