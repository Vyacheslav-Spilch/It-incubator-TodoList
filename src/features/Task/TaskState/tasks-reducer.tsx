import { TaskType, todolistAPI, UpdateStatusArgsType, UpdateTaskType, UpdateTitleArgsType } from '../../../api/todolist-api'
import { appActions } from '../../../state/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils'
import { todolistActions } from '../../TodolistList/TodolistsState/todolist-reducer'
import { TasksStateType } from '../../TodolistList/TodolistList'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'

// const initialState: TasksStateType = {}

    export const RESULT_CODE_RESPONSE = {
    succeeded: 0,
    error: 1,
    warning: 10,
} as const
    const slice = createSlice({
    name: 'task',
    initialState: {} as TasksStateType,
    reducers: {
        // deleteTask: (state, action: PayloadAction<{ todoId: string, taskId: string }>) => {
        //     const taskForTodolist = state[action.payload.todoId]
        //     const index = taskForTodolist.findIndex(task => task.id === action.payload.taskId)
        //     if(index !== -1) {
        //         taskForTodolist.splice(index, 1) 
        //     }
        // },
        // addTask: (state, action: PayloadAction<{task: TaskType}>) => {
        //     const taskForTodolist  = state[action.payload.task.todoListId]
        //     taskForTodolist.unshift(action.payload.task)
        // },
        //*
        // changeTaskStatus: (state, action: PayloadAction<{todoId: string, taskId: string, status: TaskStatuses}>) => {
        //     const taskForTodolist = state[action.payload.todoId].find(task => task.id === action.payload.taskId) 
        //     if(taskForTodolist) {
        //         taskForTodolist.status = action.payload.status
        //     }
        // },
        // changeTaskTitle: (state, action: PayloadAction<{todoId: string, taskId: string, title: string}>) => {
        //     const taskForTodolist = state[action.payload.todoId].find(task => task.id === action.payload.taskId) 
        //     if(taskForTodolist) {
        //         taskForTodolist.title = action.payload.title
        //     }
        // },
        setTasks: (state, action: PayloadAction<{todoId: string, tasks: TaskType[]}>) => {
            state[action.payload.todoId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistActions.addTodolist, (state, action) => {
            state[action.payload.todolist.id] = []
            })
            .addCase(todolistActions.removeTodolist, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todolistActions.setTodolist, (state, action) => {
                action.payload.todolist.forEach((task) => {
                    state[task.id] = []
                })
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state[action.payload.todoId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                const task = state[action.payload.task.todoListId]
                task.unshift(action.payload.task)
            })
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                const task = state[action.payload.todoId].find(task => task.id === action.payload.taskId)
                if(task) {
                    task.status = action.payload.status
                }
            })
            .addCase(updateTaskTitle.fulfilled, (state, action) => {
                const task = state[action.payload.todoId].find(task => task.id === action.payload.taskId)
                if(task) {
                    task.title = action.payload.title
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const taskForDelete = state[action.payload.todoId]
                const index = taskForDelete.findIndex(task => task.id === action.payload.taskId)
                if(index !== -1) {
                    taskForDelete.splice(index, 1)
                }
            })
        
    }
})



export const getTasks = createAppAsyncThunk<{ tasks: TaskType[], todoId: string }, string
>(`${slice.name}/getTasks`, async (todoId: string, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
        try {
            const res = await todolistAPI.getTasks(todoId)
            const tasks = res.data.items
            dispatch(tasksActions.setTasks({todoId, tasks}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return { tasks, todoId }
        } 
        catch (err: unknown) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
        }
})


export const addTask = createAppAsyncThunk<{
    task: TaskType 
}, { 
    todoId: string, 
    title: string 
}>(`${slice.name}/addTask`, async (args, thunkApi) => {
    const { dispatch, rejectWithValue} = thunkApi
    const { todoId, title} = args
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistAPI.createTask(todoId, title)
        if(res.data.resultCode === RESULT_CODE_RESPONSE.succeeded) {
            const task: TaskType = res.data.data.item
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return { task }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (err: unknown) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})



export const updateTaskStatus = createAppAsyncThunk
    <UpdateStatusArgsType, 
    UpdateStatusArgsType>(`${slice.name}/updateTaskStatus`, async (args, thunkApi) => {
    const { todoId, taskId, status } = args
    const { dispatch, rejectWithValue, getState } = thunkApi
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const tasks = getState().tasks
        const task = tasks[todoId].find(task => task.id === taskId)
        if(!task) {
            dispatch(appActions.setAppError({error: 'task not find in the state'}))
            return rejectWithValue(null)
        }
        const apiModel: UpdateTaskType = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status
        }
        const res = await todolistAPI.updateTaskStatus(todoId, taskId, apiModel)
        if(res.data.resultCode === RESULT_CODE_RESPONSE.succeeded) {
            const task: TaskType = res.data.data.item
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return { todoId: task.todoListId, taskId: task.id, status: task.status }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }

    } catch (err: unknown) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

export const updateTaskTitle = createAppAsyncThunk
    <UpdateTitleArgsType, 
    UpdateTitleArgsType>(`${slice.name}/updateTaskTitle`, async (args, thunkApi) => {
    const { todoId, taskId, title } = args
    const { dispatch, rejectWithValue } = thunkApi
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.updateTask(todoId, taskId, title)
        if(res.data.resultCode === RESULT_CODE_RESPONSE.succeeded) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            const task = res.data.data.item
            return { todoId: task.todoListId, taskId: task.id, title: task.title }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (err: unknown) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }    
})


export const deleteTask = createAppAsyncThunk<{
    todoId: string, 
    taskId: string
}, {
    todoId: string, 
    taskId: string
}>(`${slice.name}/deleteTask`, async (args, thunkApi) => {
        const { todoId, taskId } = args
        const {dispatch, rejectWithValue } = thunkApi
        dispatch(appActions.setAppStatus({status : 'loading'}))
        try {
            const res = await todolistAPI.deleteTask(todoId, taskId)
            if(res.data.resultCode === RESULT_CODE_RESPONSE.succeeded) {
                dispatch(appActions.setAppStatus({status: 'succeeded'}))

                return args
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        } catch (err: unknown) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
        }
    })

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { getTasks, addTask, updateTaskStatus, updateTaskTitle, deleteTask }








//thunk



// export const UpdateTaskTC = (todoId: string, taskId: string, title: string): AppThunk => (dispatch) => {
//     dispatch(appActions.setAppStatus({status: 'loading'}))
//     todolistAPI
//         .updateTask(todoId, taskId, title)
//         .then((res) => {
//             const tasks = res.data.data.item
//             dispatch(tasksActions.changeTaskTitle({todoId: tasks.todoListId, taskId: tasks.id, title: tasks.title}))
//             // dispatch(updateTaskAC(response))
//             dispatch(appActions.setAppStatus({status: 'succeeded'}))
//         })
//         .catch((error) => {
//             handleServerNetworkError(dispatch, error)
//         })
// }

// export const DeleteTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
//     dispatch(appActions.setAppStatus({status: 'loading'}))
//     todolistAPI
//         .deleteTask(todoId, taskId)
//         .then((res) => {
//             if (res.data.resultCode === RESULT_CODE_RESPONSE.succeeded) {
//                 dispatch(tasksActions.deleteTask({todoId, taskId}))
//                 dispatch(appActions.setAppStatus({status: 'succeeded'}))
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(dispatch, error)
//         })
// }

// export const ChangeTaskStatusTC =
//     (todoId: string, taskId: string, status: TaskStatuses) =>
//     (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         const state = getState().tasks
//         const task = state[todoId].find((task) => task.id === taskId)
//         if (task) {
//             const model: UpdateTaskType = { ...task, status }
//             dispatch(appActions.setAppStatus({status: 'succeeded'}))
//             todolistAPI
//                 .updateTaskStatus(todoId, taskId, model)
//                 .then((res) => {
//                     dispatch(tasksActions.changeTaskStatus({todoId, taskId, status}))
//                     dispatch(appActions.setAppStatus({status: 'succeeded'}))
//                 })
//                 .catch((error) => {
//                     handleServerNetworkError(dispatch, error)
//                 })
//         }
//     }
