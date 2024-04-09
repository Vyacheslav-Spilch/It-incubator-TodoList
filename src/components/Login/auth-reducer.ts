import { Dispatch } from 'redux'
import { SetAppErrorACType, setAppStatusAC, SetAppStatusACType } from '../../state/app-reducer'
import { LoginType } from './Login'

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState,action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}
// actions
type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN', 
        value 
    } as const
}
// thunks
export const loginTC = (data: LoginType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
}

// types
type ActionsType =
| SetIsLoggedInACType
| SetAppStatusACType
| SetAppErrorACType