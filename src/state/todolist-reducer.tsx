import { filterValuesType } from "../AppWithRedux";
import { v1 } from "uuid";
import { Dispatch } from "redux";
import { todolistAPI, TodolistType } from "../api/todolist-api";
import { RequestStatusType, setAppStatusAC, SetAppStatusACType } from "../app-reducer";


const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: filterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.todolist.id)
        }

        case 'SET-TODO-LISTS':
            return action.todolist.map((el) => ({...el, filter: 'all'}))
        
        case 'ADD-TODOLIST': 
            return [
                {
                    id: action.todolist.id, 
                    title: action.todolist.title, 
                    filter: 'all',
                    addedDate: action.todolist.addedDate,
                    order: action.todolist.order
                },
                ...state
            ]
        
        case 'CHANGE-TODOLIST-TITLE': 
            return state.map(todo => todo.id === action.todolist.id ? {...todo, title: action.todolist.title} : {...todo})
        
        case 'CHANGE-TODOLIST-FILTER': 
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        
        default: 
            return state
        
    }
}
type ActionsType = RemoveTodolistACtype 
| AddTodolistACtype 
| ChangeTodolistACtype 
| ChangeFilterACtype 
| SetTodolistACType
| SetAppStatusACType

export type RemoveTodolistACtype = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolist: TodolistType) => {
    return {
        type: "REMOVE-TODOLIST",
        todolist
    } as const
}
export type AddTodolistACtype = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    } as const
}

type ChangeTodolistACtype = ReturnType<typeof changeTodolistAC>
export const changeTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolist
    } as const
}

export type ChangeFilterACtype = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (id: string, filter: filterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
} 


export type SetTodolistACType = ReturnType<typeof setTodolistAC>
export const setTodolistAC = (todolist: TodolistType[]) => {
    return {
        type: 'SET-TODO-LISTS',
        todolist
    } as const
}

export const getTodolistTС = () => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI
        .getTodolist()
        .then(res => {
            dispatch(setTodolistAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI
        .createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}


export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI
        .deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}   

export const changeTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI
        .updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistAC(res.data.data.item))
        })
}
