import React from "react";
import { v1 } from "uuid";
import { filterValuesType, TasksStateType } from "../AppWithRedux";
import { TaskType } from "../TodolistWithRedux";
import { AddTodolistACtype, RemoveTodolistACtype } from "./todolist-reducer";

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'DELETE-TASK': 
            return {...state, 
                [action.payload.todolistId]: 
                state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        

        case 'ADD-TASK': 
            const newTask: TaskType = {
                id: v1(), 
                title: action.payload.newTitle, 
                isDone: false
            }
            return {...state, 
                [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]
            }
        
    
        case 'CHANGE-TASK-STATUS': 
            return {...state, 
                [action.payload.todolistID]: 
                state[action.payload.todolistID].map(el => el.id === action.payload.taskId 
                ? {...el, isDone: action.payload.newIsDoneValue} 
                : el)
            }
        

        case 'CHANGE-TASK-TITLE': 
            return {...state,
                [action.payload.todolistId]: 
                state[action.payload.todolistId].map(el => el.id === action.payload.taskId 
                ? {...el, title: action.payload.newTitle} 
                : el)
            }
        
        
        case 'ADD-TODOLIST': 
            return {
                [action.payload.todolistId]: [],
                ...state
            }
        
        case 'REMOVE-TODOLIST': 
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        
        case 'UPDATE-TASKS': 
            return {...state,
                [action.payload.todoListId]: 
                state[action.payload.todoListId].map(el => el.id === action.payload.taskId ? {...el, title: action.payload.title} : el)
            }
        
        
        default: 
            return state
        
    }
}

type ActionType = DeleteTasksACtype 
| AddTaskACtype 
| ChangeTaskStatusACtype 
| ChangeTaskTitleACtype 
| AddTodolistACtype 
| RemoveTodolistACtype 
| UpdateTasksACtype


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
export const changeTaskStatusAC = (todolistID: string, taskId: string, newIsDoneValue: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistID,
            taskId,
            newIsDoneValue
        }
    }as const
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


