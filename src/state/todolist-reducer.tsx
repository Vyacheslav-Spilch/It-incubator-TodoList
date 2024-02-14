import { filterValuesType, TodoListsType } from "../AppWithRedux";
import { v1 } from "uuid";


const initialState: Array<TodoListsType> = []

export const todolistsReducer = (state = initialState, action: TodolistsReducerACtype): TodoListsType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": 
            return state.filter(el => el.id !== action.payload.id)
        
        case 'ADD-TODOLIST': 
            return [
                {
                    id: action.payload.todolistId, 
                    title: action.payload.title, 
                    filter: 'all'
                },
                ...state
            ]
        
        case 'CHANGE-TODOLIST-TITLE': 
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        
        case 'CHANGE-TODOLIST-FILTER': 
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        
        case 'UPDATE-TODOLIST': 
            return state.map(el => el.id === action.payload.todoListId ? {...el, title: action.payload.title} : el)
        
        default: 
            return state
        
    }
}
type TodolistsReducerACtype = RemoveTodolistACtype 
| AddTodolistACtype 
| ChangeTodolistACtype 
| ChangeFilterACtype 
| UpdateTodolistACtype

export type RemoveTodolistACtype = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {id}
    }as const
}
export type AddTodolistACtype = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}

type ChangeTodolistACtype = ReturnType<typeof changeTodolistAC>
export const changeTodolistAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    }as const
}

export type ChangeFilterACtype = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (id: string, filter: filterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    }as const
} 

type UpdateTodolistACtype = ReturnType<typeof updateTodolistAC>
export const updateTodolistAC = (todoListId: string, title: string) => {
    return {
        type: 'UPDATE-TODOLIST',
        payload: {
            todoListId,
            title
        }
    }as const
}

