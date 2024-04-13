import React from "react";
import { Dispatch } from "redux";
import { ResponseType } from "../api/todolist-api";
import { setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType } from "../state/app-reducer";

type ErrorUtilsDispatchType = Dispatch<SetAppErrorACType | SetAppStatusACType>


export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T>) => {
    dispatch(data.messages.length ? setAppErrorAC(data.messages[0]) : setAppErrorAC('Неопределенная ошибка'))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: {message: string}) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}