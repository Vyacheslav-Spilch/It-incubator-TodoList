import React from 'react'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolist-api'
import { appActions } from '../state/app-reducer'

// type ErrorUtilsDispatchType = Dispatch<SetAppErrorACType | SetAppStatusACType>

export const handleServerAppError = <T>(dispatch: any, data: ResponseType<T>) => {
    dispatch(data.messages.length ? appActions.setAppError({error: data.messages[0]}) : appActions.setAppError({error: 'Неопределенная ошибка'}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (dispatch: any, error: { message: string }) => {
    dispatch(appActions.setAppError({error: error.message}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}
