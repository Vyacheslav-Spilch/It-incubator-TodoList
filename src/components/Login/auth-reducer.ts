import { Dispatch } from 'redux'
import { authAPI } from '../../api/todolist-api'
import {
    appActions,
} from '../../state/app-reducer'
import { RESULT_CODE_RESPONSE } from '../../features/Task/TaskState/tasks-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { LoginType } from './Login'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'state/store'

// type InitialStateType = {
//     isLoggedIn: boolean
// }

// const initialState: InitialStateType = {
//     isLoggedIn: false,
// }

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
    },
})

export const authReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions

// thunks

export const loginTC =
    (data: LoginType): AppThunk =>
    async (dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        try {
            const res = await authAPI.login(data)
            if (res.data.resultCode === RESULT_CODE_RESPONSE.succeeded) {
                dispatch(setIsLoggedIn({ isLoggedIn: true }))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        } catch (e) {
            handleServerNetworkError(dispatch, e as { message: string })
        }
    }

export const loginMeTC = (): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        await authAPI.loginMe()
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
    } catch (e) {
        handleServerNetworkError(dispatch, e as { message: string })
    } finally {
        dispatch(appActions.setIsInitialized({isInitialized: true}))
    }
}

export const logOutTC = (): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logOut()
        if (res.data.resultCode === RESULT_CODE_RESPONSE.succeeded) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            dispatch(setIsLoggedIn({ isLoggedIn: false }))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e as { message: string })
    }
}

// types
