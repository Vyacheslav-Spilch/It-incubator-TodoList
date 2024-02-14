import React, { Reducer, useReducer, useState } from 'react';
import './App.css';
import { AddItemForm } from './AddItemForm';
import { ButtonAppBar } from './components/ButtonAppBar';
import { TaskType } from './TodolistWithRedux';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTaskAC, changeTaskStatusAC, deleteTasksAC, tasksReducer, updateTasksAC } from './state/tasks-reducer';
import { addTodolistAC, changeFilterAC, changeTodolistAC, removeTodolistAC, updateTodolistAC } from './state/todolist-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TodoListWithRedux } from './TodolistWithRedux';


export type filterValuesType = 'all' | 'active' | 'completed'
export type TodoListsType = {
    id: string, 
    title: string, 
    filter: filterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

const AppWithRedux = () => {

let todolists = useSelector<AppRootStateType, Array<TodoListsType>>(state => state.todolists)
let dispatch = useDispatch()

const addTask = (todoListID: string, newTitle: string) => {
    dispatch(addTaskAC(todoListID, newTitle))
}

const deleteTasks = (todolistID: string, taskId: string) => {
    dispatch(deleteTasksAC(todolistID, taskId))
}

const changeTaskStatus = (todolistID: string, taskId: string, newIsDoneValue: boolean) => {
    dispatch(changeTaskStatusAC(todolistID,taskId, newIsDoneValue))
}

const changeTasks = (taskTodolistID: string, filterValues: filterValuesType) => {
    dispatch(changeFilterAC(taskTodolistID, filterValues))
}

const deleteTodolist = (todoListID: string) => {
    dispatch(removeTodolistAC(todoListID))
}

const updateTask = (todoListId: string, taskId: string, title: string) => {
    dispatch(updateTasksAC(todoListId, taskId, title))
}

const updateTodolist = (todoListId: string, title: string) => {
    dispatch(updateTodolistAC(todoListId, title))
}

const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title))
}

    let todoListContent = todolists.length !== 0 
    ? 
    todolists.map(el => {
    return (
    <Grid key={el.id} item>
        <Paper elevation={5} >
        <TodoListWithRedux
            todoListId={el.id}
            title={el.title} 
            filter={el.filter}
        />
        </Paper>
    </Grid>
    )
}) 
: 
<div className='container-title'><span className='title'>Список задач пуст</span></div>


return (
    <div className="App">
    <ButtonAppBar />
        <Container fixed>
        <Grid container >
            <Paper elevation={3} />
                <AddItemForm callBack={addTodolist}/>
            <Paper />
        </Grid>
        <Grid container spacing={3}>
            {todoListContent}
        </Grid>
        </Container>
    </div>
);

}

export default AppWithRedux;