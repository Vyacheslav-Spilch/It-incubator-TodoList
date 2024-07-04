import { instance } from 'common'


export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title })
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType<{ item: TodolistType }>>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType<{ item: TodolistType }>>(`todo-lists/${id}`, { title })
    },
    getTasks(todolistId: string) {
        return instance.get<getTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTaskStatus(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`,  model )
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title} )
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
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

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type UpdateStatusArgsType = {
    todoId: string 
    taskId: string 
    status: TaskStatuses
}

export type UpdateTitleArgsType = {
    todoId: string,
    taskId: string
    title: string
}

export const RESULT_CODE_RESPONSE = {
    succeeded: 0,
    error: 1,
    warning: 10,
} as const

