import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist (title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolist (id: string) {
        return instance.delete<ResponseType<{item: TodolistType}>>(`todo-lists/${id}`)
    },
    updateTodolist (id: string, title: string) {
        return instance.put<ResponseType<{item: TodolistType}>>(`todo-lists/${id}`, {title})
    },
    getTasks (todolistId: string) {
        return instance.get<getTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask (todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask (todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    deleteTask (todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskStatus (todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType<{item: TaskType}>, UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, {model})
    }
}

export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type getTasksResponse = {
    totalCount: number
    error: string | null
    items: TaskType[]
}

export type ResponseType<T = {}> = {
    resultCode: number 
    messages: string[]
    data: T
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}


