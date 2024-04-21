import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'



const slice = createSlice({
    name: 'app',
    initialState: {
        isInitialized: false,
        status: 'loading' as RequestStatusType,
        error: null as string | null,
    },
    reducers: {
        setAppStatus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error
        },
        setIsInitialized: (state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions
// export type InitialStateType = {
//     isInitialized: boolean
//     status: RequestStatusType
//     error: string | null
// }

// const initialState: InitialStateType = {
//     isInitialized: false,
//     status: 'loading' as RequestStatusType,
//     error: null,
// }


// enum APP_REDUCER_TYPE {
//     statusType = 'APP/SET-STATUS',
//     errorType = 'APP/SET-ERROR',
//     isInitializedType = 'APP/SET-ISINITIALIZED',
// }




//reducer


//actions


//type
