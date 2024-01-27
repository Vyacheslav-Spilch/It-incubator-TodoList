import { filterValuesType, TodoListsType } from "../App";
import { v1 } from "uuid";


export const todolistsReducer = (state: TodoListsType[], action: TodolistsReducerACtype): TodoListsType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.id)
        }

        case 'ADD-TODOLIST':  {
            let todolistID = v1()
            let newTodolist: TodoListsType = {
                id: todolistID, 
                title: action.payload.title,
                filter: "all"
            }
            return [...state, newTodolist]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default: 
            return state
        
    }
}
type TodolistsReducerACtype = RemoveTodolistACtype | AddTodolistACtype | changeTodolistACtype | changeFilterACtype

type RemoveTodolistACtype = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {id}
    }as const
}

type AddTodolistACtype = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}

type changeTodolistACtype = ReturnType<typeof changeTodolistAC>
export const changeTodolistAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    }as const
}

type changeFilterACtype = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (id: string, filter: filterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    }as const
} 

