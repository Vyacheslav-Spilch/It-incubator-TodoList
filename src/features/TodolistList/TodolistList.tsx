import React, { useCallback, useEffect } from 'react'
import '../../../src/App.css'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { AddItemForm } from '../../AddItemForm'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { TodoList } from './Todolist'
import { TaskStatuses, TaskType } from '../../api/todolist-api'
import { tasksThunks } from '../Task/TaskState/tasks-reducer'
import {
    changeTodolistTC,
    createTodolistTC,
    deleteTodolistTC,
    getTodolistTС,
    todolistActions,
    TodolistDomainType,
} from './TodolistsState/todolist-reducer'
import { Navigate } from 'react-router-dom'

export type filterValuesType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key: string]: TaskType[]
}

export const TodolistList = () => {
    const todolists = useAppSelector<Array<TodolistDomainType>>((state) => state.todolists)
    const tasks = useAppSelector<TasksStateType>((state) => state.tasks)
    const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn)
    const dispatch = useAppDispatch()

    const addTask = useCallback(
        (todoId: string, title: string) => {
            dispatch(tasksThunks.addTask({todoId, title}))
        },
        [dispatch],
    )

    const deleteTasks = useCallback(
        (todoId: string, taskId: string) => {
            dispatch(tasksThunks.deleteTask({todoId, taskId}))
        },
        [dispatch],
    )

    const changeTaskStatus = useCallback(
        (todoId: string, taskId: string, status: TaskStatuses) => {
            dispatch(tasksThunks.updateTaskStatus({todoId, taskId, status}))
        },
        [dispatch],
    )

    const changeTasks = useCallback(
        (id: string, filter: filterValuesType) => {
            dispatch(todolistActions.changeFilter({id, filter}))
        },
        [dispatch],
    )

    const deleteTodolist = useCallback(
        (todoListId: string) => {
            dispatch(deleteTodolistTC(todoListId))
        },
        [dispatch],
    )

    const updateTaskTitle = useCallback(
        (todoId: string, taskId: string, title: string) => {
            dispatch(tasksThunks.updateTaskTitle({todoId, taskId, title}))
        },
        [dispatch],
    )

    const updateTodolist = useCallback(
        (todoListId: string, title: string) => {
            dispatch(changeTodolistTC(todoListId, title))
        },
        [dispatch],
    )

    const addTodolist = useCallback(
        (title: string) => {
            dispatch(createTodolistTC(title))
        },
        [dispatch],
    )

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTodolistTС())
        }
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className="App">
            <Grid container>
                <AddItemForm callBack={addTodolist} />
            </Grid>
            <Grid container spacing={3}>
                <Paper elevation={3} />
                {todolists.length !== 0 ? (
                    todolists.map((el) => {
                        return (
                            <Grid key={el.id} item>
                                <Paper elevation={5}>
                                    <TodoList
                                        todoListId={el.id}
                                        title={el.title}
                                        filter={el.filter}
                                        entityStatus={el.entityStatus}
                                        tasks={tasks[el.id]}
                                        deleteTasks={deleteTasks}
                                        deleteTodolist={deleteTodolist}
                                        changeTasks={changeTasks}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        updateTaskTitle={updateTaskTitle}
                                        updateTodolist={updateTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                ) : (
                    <div className="container-title">
                        <span className="title">Список задач пуст</span>
                    </div>
                )}
                <Paper />
            </Grid>
        </div>
    )
}
