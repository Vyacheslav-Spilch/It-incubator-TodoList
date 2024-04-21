import { title } from 'process'
import React from 'react'
import { Dispatch } from 'redux'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses, TaskType, todolistAPI, TodolistType, UpdateTaskType } from '../../../api/todolist-api'
import { appActions } from '../../../state/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils'
import { AppRootStateType, AppThunk } from '../../../state/store'
import { todolistActions } from '../../TodolistList/TodolistsState/todolist-reducer'
import { TasksStateType } from '../../TodolistList/TodolistList'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/
}


const slice = createSlice({
    name: 'task',
    initialState: {} as TasksStateType,
    reducers: {
        deleteTask: (state, action: PayloadAction<{todoId: string, taskId: string}>) => {
            const taskForTodolist = state[action.payload.todoId]
            const index = taskForTodolist.findIndex(task => task.id === action.payload.taskId)
            if(index !== -1) {
                taskForTodolist.splice(index, 1) 
            }
        },
        addTask: (state, action: PayloadAction<{task: TaskType}>) => {
            const taskForTodolist  = state[action.payload.task.todoListId]
            taskForTodolist.unshift(action.payload.task)
        },
        //*
        changeTaskStatus: (state, action: PayloadAction<{todoId: string, taskId: string, status: TaskStatuses}>) => {
            const taskForTodolist = state[action.payload.todoId].find(task => task.id === action.payload.taskId) 
            if(taskForTodolist) {
                taskForTodolist.status = action.payload.status
            }
        },
        changeTaskTitle: (state, action: PayloadAction<{todoId: string, taskId: string, title: string}>) => {
            const taskForTodolist = state[action.payload.todoId].find(task => task.id === action.payload.taskId) 
            if(taskForTodolist) {
                taskForTodolist.title = action.payload.title
            }
        },
        setTasks: (state, action: PayloadAction<{todoId: string, tasks: TaskType[]}>) => {
            state[action.payload.todoId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistActions.addTodolist, (state, action) => {
            state[action.payload.todolist.id] = []
            })
            .addCase(todolistActions.removeTodolist, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todolistActions.setTodolist, (state, action) => {
                action.payload.todolist.forEach((task) => {
                    state[task.id] = []
                })
            })
        
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

export enum RESULT_CODE_RESPONSE {
    succeeded = 0,
    error = 1,
    warning = 10,
}

export const getTasksTC = (todoId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistAPI
        .getTasks(todoId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(tasksActions.setTasks({todoId, tasks}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}

// export type CreateTaskACtype = ReturnType<typeof createTaskAC>
// export const createTaskAC = (task: TaskType) => {
//     return {
//         type: 'SET-TASK',
//         task,
//     } as const
// }

export const CreateTaskTC = (todoId: string, title: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistAPI
        .createTask(todoId, title)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODE_RESPONSE.succeeded) {
                dispatch(tasksActions.addTask({task: res.data.data.item}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError<{ item: TaskType }>(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}

// export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
// export const updateTaskAC = (task: TaskType) => {
//     return {
//         type: 'SET-UPDATE-TASK',
//         task,
//     } as const
// }

export const UpdateTaskTC = (todoId: string, taskId: string, title: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistAPI
        .updateTask(todoId, taskId, title)
        .then((res) => {
            const tasks = res.data.data.item
            dispatch(tasksActions.changeTaskTitle({todoId: tasks.todoListId, taskId: tasks.id, title: tasks.title}))
            // dispatch(updateTaskAC(response))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}

export const DeleteTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistAPI
        .deleteTask(todoId, taskId)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODE_RESPONSE.succeeded) {
                dispatch(tasksActions.deleteTask({todoId, taskId}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}

export const ChangeTaskStatusTC =
    (todoId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState().tasks
        const task = state[todoId].find((task) => task.id === taskId)
        if (task) {
            const model: UpdateTaskType = { ...task, status }
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            todolistAPI
                .updateTaskStatus(todoId, taskId, model)
                .then((res) => {
                    dispatch(tasksActions.changeTaskStatus({todoId, taskId, status}))
                    dispatch(appActions.setAppStatus({status: 'succeeded'}))
                })
                .catch((error) => {
                    handleServerNetworkError(dispatch, error)
                })
        }
    }
