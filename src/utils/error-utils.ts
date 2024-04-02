import React from "react";
import { Dispatch } from "redux";
import { ResponseType } from "../api/todolist-api";
import { setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType } from "../state/app-reducer";

type ErrorUtilsDispatchType = Dispatch<SetAppErrorACType | SetAppStatusACType>
type ErrorType = {
    message: string
}

export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T>) => {
    if(data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
        dispatch(setAppStatusAC('failed'))
    } else {
        dispatch(setAppErrorAC('Неопределенная ошибка'))
        dispatch(setAppStatusAC('failed'))
    }
}

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: ErrorType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}