import axios from 'axios'
import React from 'react'
import { Dispatch } from 'redux'
import { AppDispatchType } from 'state/store'
import { ResponseType } from '../api/todolist-api'
import { appActions } from '../state/app-reducer'


export const handleServerAppError = <T>(dispatch: AppDispatchType, data: ResponseType<T>) => {
    dispatch(data.messages.length ? appActions.setAppError({error: data.messages[0]}) : appActions.setAppError({error: 'Неопределенная ошибка'}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}


export const handleServerNetworkError = (err: unknown, dispatch: AppDispatchType) => {
    let errorMessage = 'Some error occurred'

    if(axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err?.message || errorMessage
    } else if(err instanceof Error) {
        errorMessage = `Native error ${err.message}`
    } else {
        errorMessage = JSON.stringify(err, null, 2)
    }

    dispatch(appActions.setAppError({ error: errorMessage }))
    dispatch(appActions.setAppStatus({ status: 'failed' }))
}
