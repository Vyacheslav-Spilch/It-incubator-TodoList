import { RESULT_CODE_RESPONSE, TaskType, todolistAPI, UpdateStatusArgsType, UpdateTaskType, UpdateTitleArgsType } from '../../../api/todolist-api'
import { appActions } from '../../../state/app-reducer'
import { handleServerAppError } from 'utils/handleServerAppError'
import { todolistActions } from '../../TodolistList/TodolistsState/todolist-reducer'
import { TasksStateType } from '../../TodolistList/TodolistList'
import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'
import { handleServerNetworkError } from 'utils'

// const initialState: TasksStateType = {}


    const slice = createSlice({
    name: 'task',
    initialState: {} as TasksStateType,
    reducers: {},
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







