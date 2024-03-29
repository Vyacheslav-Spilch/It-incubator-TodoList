export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
    status: 'loading' as RequestStatusType,
    error: null
}

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {

    case 'APP/SET-STATUS': {
        return { ...state, status: action.status }
    }

    case 'APP/SET-ERROR': {
        return {...state, error: action.error}
    }
    default:
        return state
    }
}


export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}

export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

type ActionsType = SetAppStatusACType | SetAppErrorACType