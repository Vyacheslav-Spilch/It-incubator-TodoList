import { v1 } from 'uuid'
import { Dispatch } from 'redux'
import { todolistAPI, TodolistType } from '../../../api/todolist-api'
import {
    appActions,
    RequestStatusType
} from '../../../state/app-reducer'
import { filterValuesType } from '../TodolistList'
import { AppThunk } from 'state/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleServerNetworkError } from 'utils/handleServerNetworkError'

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: filterValuesType
    entityStatus: RequestStatusType
}


const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomainType[],
    reducers: {
        removeTodolist: (state, action: PayloadAction<{id: string}>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if(index !== -1) {
                state.splice(index, 1)
            }
        },
        addTodolist: (state, action: PayloadAction<{todolist: TodolistType}>) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolist: (state, action: PayloadAction<{id: string, title: string}>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if(index !== -1) {
                state[index].title = action.payload.title
            }
        },
        changeFilter: (state, action: PayloadAction<{id: string, filter: filterValuesType}>) => {
            const todo = state.find(todo => todo.id === action.payload.id) 
            if(todo) {
                todo.filter = action.payload.filter
            }
        },
        setTodolist: (state, action: PayloadAction<{todolist: TodolistType[]}>) => {
            action.payload.todolist.forEach(todo => {
                state.push({...todo, filter: 'all', entityStatus: 'idle'})
            });
        },
        setTodoEntityStatus: (state, action: PayloadAction<{id: string, entityStatus: RequestStatusType}>) => {
            const todo = state.find(todo => todo.id === action.payload.id)
            if(todo) {
                todo.entityStatus = action.payload.entityStatus
            }
        },
    }
})

export const todolistsReducer = slice.reducer
export const todolistActions = slice.actions


//Thunc Creators
export const getTodolistTС = (): AppThunk => (dispatch) => {
    todolistAPI
        .getTodolist()
        .then((res) => {
            dispatch(todolistActions.setTodolist({todolist: res.data}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}

export const createTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistAPI
        .createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(todolistActions.addTodolist({todolist: res.data.data.item}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                if (res.data.messages.length) {
                    dispatch(appActions.setAppError({error: res.data.messages[0]}))
                    dispatch(appActions.setAppStatus({status: 'failed'}))
                } else {
                    dispatch(appActions.setAppError({error: 'Неопределенная ошибка'}))
                    dispatch(appActions.setAppStatus({status: 'failed'}))
                }
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}

export const changeTodolistTC = (id: string, title: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistAPI
        .updateTodolist(id, title)
        .then((res) => {
            dispatch(todolistActions.changeTodolist({id, title}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}

export const deleteTodolistTC = (id: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    dispatch(todolistActions.setTodoEntityStatus({id, entityStatus: 'loading'}))
    todolistAPI
        .deleteTodolist(id)
        .then((res) => {
            dispatch(todolistActions.removeTodolist({id}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        })
        .catch((error) => {
            dispatch(todolistActions.setTodoEntityStatus({id, entityStatus: 'idle'}))
            dispatch(appActions.setAppStatus({status: 'failed'}))
            dispatch(appActions.setAppError({error: error.message}))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}
