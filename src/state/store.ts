import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolist-reducer'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { thunk, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer } from '../app-reducer'
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = useDispatch<AppDispatchType>
//альтернативаный способ кастомизации useDispatch и его типизации
// export type AppDispatch = typeof store.dispatch 
// export const useAppDispatch: () => AppDispatch = useDispatch


export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
