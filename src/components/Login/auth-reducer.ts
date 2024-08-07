import { Dispatch } from 'redux'
import { RESULT_CODE_RESPONSE } from 'api/todolist-api'
import { authAPI } from 'api/auth_api'
import {
    appActions,
} from 'state/app-reducer'
import { LoginType } from './Login'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'state/store'
import { handleServerNetworkError, handleServerAppError } from 'utils'



const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false as boolean,
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
            handleServerNetworkError(e as { message: string }, dispatch)
        }
    }

export const loginMeTC = (): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        await authAPI.loginMe()
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
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
        handleServerNetworkError(e as { message: string }, dispatch)
    }
}

