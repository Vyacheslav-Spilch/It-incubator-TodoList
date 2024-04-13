import { title } from "process";
import React from "react";
import { Dispatch } from "redux";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskType } from "../../../api/todolist-api";
import { setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType } from "../../../state/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../../utils/error-utils";
import { AppRootStateType } from "../../../state/store";
import { AddTodolistACtype, RemoveTodolistACtype, setTodolistAC, SetTodolistACType } from "../../TodolistList/TodolistsState/todolist-reducer";
import { TasksStateType } from "../../TodolistList/TodolistList";

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


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODO-LISTS': {
            const copyStateTodos = {...state}
            action.todolist.forEach(el => {
                copyStateTodos[el.id] = []
            })
            return copyStateTodos
        }

        case 'SET-TASKS': {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        }

        case 'SET-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }

        case 'SET-UPDATE-TASK': {
            return {
                ...state, 
                [action.task.todoListId]: 
                state[action.task.todoListId].map(task => task.id === action.task.id ? {...task, title: action.task.title} : task)
            }
        }



        case 'ADD-TASK': {
        const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.newTitle,
                status: TaskStatuses.New,
                todoListId: action.payload.todoListID, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
            const tasks = stateCopy[action.payload.todoListID];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.payload.todoListID] = newTasks;
            return stateCopy;
        }

        case 'DELETE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.payload.taskId);
            stateCopy[action.payload.todolistId] = newTasks;
            return stateCopy;
        }
            
    
        case 'CHANGE-TASK-STATUS': {
            return {...state, 
                [action.payload.todolistID]: 
                state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? {...el, status: action.payload.status} : el)
            }
        }
        

        case 'CHANGE-TASK-TITLE': {
            return {...state,
                [action.payload.todolistId]: 
                state[action.payload.todolistId].map(el => el.id === action.payload.taskId 
                ? {...el, title: action.payload.newTitle} 
                : el)
            }
        }
        
        
        case 'ADD-TODOLIST': {
            return {
                [action.todolist.id]: [],
                ...state
            }
        }
        
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        
        case 'UPDATE-TASKS': {
            return {...state,
                [action.payload.todoListId]: 
                state[action.payload.todoListId].map(el => el.id === action.payload.taskId ? {...el, title: action.payload.title} : el)
            }
        }
        
        
        default: 
            return state
        
    }
}

type ActionsType = DeleteTasksACtype 
| AddTaskACtype 
| ChangeTaskStatusACtype 
| ChangeTaskTitleACtype 
| AddTodolistACtype 
| RemoveTodolistACtype 
| UpdateTasksACtype
| SetTodolistACType
| SetTasksACType
| CreateTaskACtype
| UpdateTaskACType
| SetAppStatusACType
| SetAppErrorACType


type DeleteTasksACtype = ReturnType<typeof deleteTasksAC>
export const deleteTasksAC = (todolistId: string, taskId: string)  => {
    return {
        type: 'DELETE-TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}

type AddTaskACtype = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListID,
            newTitle
        }
    }as const
}

type ChangeTaskStatusACtype = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistID,
            taskId,
            status
        }
    } as const
}

type ChangeTaskTitleACtype = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            taskId,
            newTitle
        }
    }as const 
}

type UpdateTasksACtype = ReturnType<typeof updateTasksAC>
export const updateTasksAC = (todoListId: string, taskId: string, title: string) => {
    return {
        type: 'UPDATE-TASKS',
        payload: {
            todoListId,
            taskId,
            title
        }
    }as const
}


export type SetTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todolistId,
            tasks
        } 
    } as const
}

export enum RESULT_CODE_RESPONSE {
    succeeded = 0,
    error = 1,
    warning = 10
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI
        .getTasks(todolistId)
        .then(res => {
            const response = res.data.items
            dispatch(setTasksAC(todolistId, response))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}

export type CreateTaskACtype = ReturnType<typeof createTaskAC>
export const createTaskAC = (task: TaskType) => {
    return {
        type: 'SET-TASK',
        task
    } as const
}

export const CreateTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI
        .createTask(todolistId, title)
        .then(res => {
            if(res.data.resultCode === RESULT_CODE_RESPONSE.succeeded) {
                dispatch(createTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError<{item: TaskType}>(dispatch, res.data)
            }
            
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}

export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (task: TaskType) => {
    return {
        type: 'SET-UPDATE-TASK',
        task
    } as const
}

export const UpdateTaskTC = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI
        .updateTask(todolistId, taskId, title)
        .then(res => {
            const response = res.data.data.item
            dispatch(updateTaskAC(response))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}


export const DeleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI
        .deleteTask(todolistId, taskId)
        .then(res => {
            if(res.data.resultCode === RESULT_CODE_RESPONSE.succeeded) {
                dispatch(deleteTasksAC(todolistId, taskId))
                dispatch(setAppStatusAC('succeeded'))
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}


export const ChangeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => 
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState().tasks
    const task = state[todolistId].find(task => task.id === taskId)
    if(task) {
        const model: UpdateTaskType = {...task, status}
        dispatch(setAppStatusAC('loading'))
        todolistAPI
            .updateTaskStatus(todolistId, taskId, model)
            .then(res => {
                dispatch(changeTaskStatusAC(todolistId, taskId, status))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(dispatch, error)
            })
    }
    
}