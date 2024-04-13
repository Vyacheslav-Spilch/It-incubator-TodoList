import React, { useCallback, useEffect,} from 'react';
import '../../../src/App.css';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { AddItemForm } from '../../AddItemForm';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { TodoList } from './Todolist';
import { TaskStatuses, TaskType } from '../../api/todolist-api';
import { ChangeTaskStatusTC, CreateTaskTC, DeleteTaskTC, UpdateTaskTC } from '../Task/TaskState/tasks-reducer';
import { changeFilterAC, changeTodolistTC, createTodolistTC, deleteTodolistTC, getTodolistTС, TodolistDomainType } from './TodolistsState/todolist-reducer';
import { Navigate } from 'react-router-dom';

export type filterValuesType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key: string]: TaskType[]
}

export const TodolistList = () => {

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.authReducer.isLoggedIn)
    const dispatch = useAppDispatch()

const addTask = useCallback((todoListID: string, newTitle: string) => {
    dispatch(CreateTaskTC(todoListID, newTitle))
}, [dispatch])

const deleteTasks = useCallback((todolistId: string, taskId: string) => {
    dispatch(DeleteTaskTC(todolistId, taskId))
}, [dispatch])

const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
    dispatch(ChangeTaskStatusTC(todolistId, taskId, status))
}, [dispatch])

const changeTasks = useCallback((taskTodolistID: string, filterValues: filterValuesType) => {
    dispatch(changeFilterAC(taskTodolistID, filterValues))
}, [dispatch])

const deleteTodolist = useCallback((todoListId: string) => {
    dispatch(deleteTodolistTC(todoListId))
}, [dispatch])

const updateTaskTitle = useCallback((todoListId: string, taskId: string, title: string) => {
    dispatch(UpdateTaskTC(todoListId, taskId, title))
}, [dispatch])

const updateTodolist = useCallback((todoListId: string, title: string) => {
    dispatch(changeTodolistTC(todoListId, title))
}, [dispatch])

const addTodolist = useCallback((title: string) => {
    dispatch(createTodolistTC(title))
}, [dispatch])

    useEffect(() => {
        if(isLoggedIn) {
            dispatch(getTodolistTС())
        }
    }, [])

    if(!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }


//     let todoListContent = todolists.length !== 0? 
//     todolists.map(el => {
        
//     return (
//     <Grid key={el.id} item>
//         <Paper elevation={5} >
//         <TodoList
//             todoListId={el.id}
//             title={el.title} 
//             filter={el.filter}
//             entityStatus={el.entityStatus}
//             tasks={tasks[el.id]}
//             deleteTasks={deleteTasks}
//             deleteTodolist={deleteTodolist}
//             changeTasks={changeTasks}
//             addTask={addTask}
//             changeTaskStatus={changeTaskStatus}
//             updateTaskTitle={updateTaskTitle}
//             updateTodolist={updateTodolist}
//         />
//         </Paper>
//     </Grid>
//     )
// }) 
// : 
// <div className='container-title'><span className='title'>Список задач пуст</span></div>


return (
    <div className="App">
        <Grid container >
            <AddItemForm callBack={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
            <Paper elevation={3} />
                {todolists.length !== 0 
                ? 
                    todolists.map(el => {
                    return (
                    <Grid key={el.id} item>
                        <Paper elevation={5} >
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
                : 
                <div className='container-title'><span className='title'>Список задач пуст</span></div>}
                <Paper />
        </Grid>
    </div>
);

}
