import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { todolistAPI } from '../api/todolist-api'

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolist().then((data) => {
            setState(data.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'React'
        todolistAPI.createTodolist(title).then((data) => {
            setState(data.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = '7974b647-1c09-4169-bb31-8f8111214534'
        todolistAPI.deleteTodolist(id).then((data) => {
            setState(data.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = 'b118eab3-7182-48a4-8f98-a2499a0d4a19'
        const body = 'TS'
        todolistAPI.updateTodolist(id, body).then((data) => {
            setState(data.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setTasks] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'b118eab3-7182-48a4-8f98-a2499a0d4a19'
        todolistAPI.getTasks(todolistId).then((data) => {
            setTasks(data.data.items)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'b118eab3-7182-48a4-8f98-a2499a0d4a19'
        const title = 'Media'
        todolistAPI.createTask(todolistId, title).then((data) => {
            setState(data.data.data.item)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'b118eab3-7182-48a4-8f98-a2499a0d4a19'
        const taskId = '3246f59e-eeaa-4cdd-8839-49da6d5d7bd5'
        const title = 'Soft skills'
        todolistAPI.updateTask(todolistId, taskId, title).then((data) => {
            setState(data.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId).then((data) => {
            setState(data.data.messages)
        })
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input placeholder="TodolistId" value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)} />
            <input placeholder="TaskId" value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} />

            <button onClick={deleteTask}>Delete task</button>
        </div>
    )
}
