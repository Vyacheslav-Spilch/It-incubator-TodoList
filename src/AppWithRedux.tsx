import React, { useCallback, useEffect,} from 'react';
import './App.css';
import { AddItemForm } from './AddItemForm';
import { ButtonAppBar } from './components/ButtonAppBar';
// import { TaskType } from './Todolist';
// import { TodoListWithRedux } from './TodolistWithRedux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTaskAC, changeTaskStatusAC, changeTaskStatusTC, CreateTaskTC, deleteTasksAC, DeleteTaskTC, updateTasksAC, UpdateTaskTC } from './state/tasks-reducer';
import { addTodolistAC, changeFilterAC, removeTodolistAC, getTodolistTС, TodolistDomainType, deleteTodolistTC, createTodolistTC, changeTodolistTC} from './state/todolist-reducer';
import { useAppDispatch, useAppSelector } from './state/store';
import { TodoList } from './Todolist';
import { TaskStatuses, TaskType } from './api/todolist-api';
import LinearProgress from '@mui/material/LinearProgress';
import { InitialStateType, RequestStatusType } from './app-reducer';

export type filterValuesType = 'all' | 'active' | 'completed'
// export type TodoListsType = {
//     id: string, 
//     title: string, 
//     filter: filterValuesType
// }

export type TasksStateType = {
    [key: string]: TaskType[]
}

const AppWithRedux = () => {

let todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
let tasks = useAppSelector<TasksStateType>(state => state.tasks)
let status = useAppSelector<RequestStatusType>(state => state.app.status)
let dispatch = useAppDispatch()

const addTask = useCallback((todoListID: string, newTitle: string) => {
    dispatch(CreateTaskTC(todoListID, newTitle))
}, [dispatch])

const deleteTasks = useCallback((todolistId: string, taskId: string) => {
    dispatch(DeleteTaskTC(todolistId, taskId))
}, [dispatch])

const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
    dispatch(changeTaskStatusTC(todolistId, taskId, status))
}, [dispatch])

const changeTasks = useCallback((taskTodolistID: string, filterValues: filterValuesType) => {
    dispatch(changeFilterAC(taskTodolistID, filterValues))
}, [dispatch])

const deleteTodolist = useCallback((todoListId: string) => {
    // dispatch(removeTodolistAC(todoListID))
    dispatch(deleteTodolistTC(todoListId))
}, [dispatch])

const updateTaskTitle = useCallback((todoListId: string, taskId: string, title: string) => {
    dispatch(UpdateTaskTC(todoListId, taskId, title))
}, [dispatch])

const updateTodolist = useCallback((todoListId: string, title: string) => {
    dispatch(changeTodolistTC(todoListId, title))
}, [dispatch])

const addTodolist = useCallback((title: string) => {
    // dispatch(addTodolistAC(title))
    dispatch(createTodolistTC(title))
}, [dispatch])

    useEffect(() => {
        dispatch(getTodolistTС())
    }, [])

    let todoListContent = todolists.length !== 0 
    ? 
    todolists.map(el => {
        
    return (
    <Grid key={el.id} item>
        <Paper elevation={5} >
        <TodoList
            todoListId={el.id}
            title={el.title} 
            filter={el.filter}
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
: 
<div className='container-title'><span className='title'>Список задач пуст</span></div>


return (
    <div className="App">
    <ButtonAppBar />
        <Container fixed>
        {status === 'loading' && <LinearProgress color="primary" />}
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