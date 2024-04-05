import { v1 } from "uuid";
import { Dispatch } from "redux";
import { todolistAPI, TodolistType } from "../api/todolist-api";
import { RequestStatusType, setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType } from "./app-reducer";
import { handleServerNetworkError } from "../utils/error-utils";
import { filterValuesType } from "../features/TodolistList/TodolistList";


const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: filterValuesType
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.todolistId)
        }
        case 'SET-TODO-ENTITY-STATUS': {
            return state.map(todo => todo.id === action.todolistId ? {...todo, entityStatus: action.entityStatus} : todo)
        }

        case 'SET-TODO-LISTS':
            return action.todolist.map((el) => ({...el, filter: 'all', entityStatus: 'idle'}))
        
        case 'ADD-TODOLIST': 
            return [
                {
                    id: action.todolist.id, 
                    title: action.todolist.title, 
                    filter: 'all',
                    entityStatus: 'idle',
                    addedDate: action.todolist.addedDate,
                    order: action.todolist.order
                },
                ...state
            ]
        
        case 'CHANGE-TODOLIST-TITLE': 
            return state.map(todo => todo.id === action.todolistId ? {...todo, title: action.title} : {...todo})
        
        case 'CHANGE-TODOLIST-FILTER': 
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        
        default: 
            return state
        
    }
}

//Типизация actions
type ActionsType = RemoveTodolistACtype 
| AddTodolistACtype 
| ChangeTodolistACtype 
| ChangeFilterACtype 
| SetTodolistACType
| SetAppStatusACType
| SetAppErrorACType
| SetTodoEntityStatusACType

//Action Creators
export type RemoveTodolistACtype = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId
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
export const changeTodolistAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId,
        title
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

export type SetTodoEntityStatusACType = ReturnType<typeof setTodoEntityStatusAC>
export const setTodoEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => {
    return {
        type: 'SET-TODO-ENTITY-STATUS',
        todolistId,
        entityStatus
    } as const
}


//Thunc Creators
export const getTodolistTС = () => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI
        .getTodolist()
        .then(res => {
            dispatch(setTodolistAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}



export const createTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI
        .createTodolist(title)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if(res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                    dispatch(setAppStatusAC('failed'))
                } else {
                    dispatch(setAppErrorAC('Неопределенная ошибка'))
                    dispatch(setAppStatusAC('failed'))

                }
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}

export const changeTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI
        .updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistAC(todolistId, title))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodoEntityStatusAC(todolistId, 'loading'))
    todolistAPI
        .deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch ((error) => {
            console.log(error);
            dispatch(setTodoEntityStatusAC(todolistId, 'idle'))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppErrorAC(error.message))
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}   


