import { tasksReducer } from '../features/Task/TaskState/tasks-reducer'
import { todolistsReducer } from '../features/TodolistList/TodolistsState/todolist-reducer'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from 'redux'
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer } from './app-reducer'
import { authReducer } from '../components/Login/auth-reducer'
import { configureStore } from '@reduxjs/toolkit'
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    authReducer: authReducer,
})
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({ reducer: rootReducer })
// определить автоматически тип всего объекта состояния

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = useDispatch<AppDispatchType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>
//альтернативаный способ кастомизации useDispatch и его типизации
// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch: () => AppDispatch = useDispatch



export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
