export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    isInitialized: boolean
    status: RequestStatusType
    error: string | null
}

const initialState: InitialStateType = {
    isInitialized: false,
    status: 'loading' as RequestStatusType,
    error: null
}

enum APP_REDUCER_TYPE {
    statusType = 'APP/SET-STATUS',
    errorType = 'APP/SET-ERROR',
    isInitializedType = 'APP/SET-ISINITIALIZED',
}

//reducer
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

    case APP_REDUCER_TYPE.statusType : 
        return { ...state, status: action.status }

    case APP_REDUCER_TYPE.errorType : 
        return {...state, error: action.error}
    
    case APP_REDUCER_TYPE.isInitializedType : 
        return {...state, isInitialized: action.isInitialized}
    
    default:
        return state
    }
}

//actions
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: APP_REDUCER_TYPE.statusType ,
        status
    } as const
}

export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => {
    return {
        type: APP_REDUCER_TYPE.errorType,
        error
    } as const
}

export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>
export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: APP_REDUCER_TYPE.isInitializedType,
        isInitialized
    } as const
}

//type
type ActionsType = SetAppStatusACType 
| SetAppErrorACType 
| SetIsInitializedACType