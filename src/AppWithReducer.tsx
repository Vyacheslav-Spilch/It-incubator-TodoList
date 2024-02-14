import React, { Reducer, useReducer, useState } from 'react';
// import './App.css';
// import { v1 } from 'uuid';
// import { AddItemForm } from './AddItemForm';
// import { ButtonAppBar } from './components/ButtonAppBar';
// import { TaskType, TodoList } from './Todolist';

// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import { addTaskAC, changeTaskStatusAC, deleteTasksAC, tasksReducer, updateTasksAC } from './state/tasks-reducer';
// import { addTodolistAC, changeFilterAC, changeTodolistAC, removeTodolistAC, todolistsReducer, updateTodolistAC } from './state/todolist-reducer';


// export type filterValuesType = 'all' | 'active' | 'completed'
// export type TodoListsType = {id: string, title: string, filter: filterValuesType}
// export type TasksStateType = {
//     [key: string]: TaskType[]
// }

// const AppWithReducer = () => {

// let todolistID1 = v1()
// let todolistID2 = v1()

// let [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
//     {id: todolistID1, title: 'Skills #1', filter: 'all'},
//     {id: todolistID2, title: 'Skills #2', filter: 'all'},
// ])

// let [tasks, dispatchTasks] = useReducer(tasksReducer,{
//     [todolistID1]: [
//         {id: v1(), title: 'HTML&CSS', isDone: true},
//         {id: v1(), title: 'JS', isDone: true},
//         {id: v1(), title: 'ReactJS', isDone: false},
//     ],
//     [todolistID2]: [
//         {id: v1(), title: 'Rest API', isDone: true},
//         {id: v1(), title: 'GraphQL', isDone: false},
//     ]
// })


// const deleteTasks = (todolistID: string, taskId: string) => {
//     dispatchTasks(deleteTasksAC(todolistID, taskId))
// }

// const addTask = (todoListID: string, newTitle: string) => {
//     dispatchTasks(addTaskAC(todoListID, newTitle))
// }

// const changeTaskStatus = (todolistID: string, taskId: string, newIsDoneValue: boolean) => {
//     dispatchTasks(changeTaskStatusAC(todolistID,taskId, newIsDoneValue))
// }

// const changeTasks = (taskTodolistID: string, filterValues: filterValuesType) => {
//     dispatchTodolists(changeFilterAC(taskTodolistID, filterValues))
// }
// const deleteTodolist = (todoListID: string) => {
//     let action = removeTodolistAC(todoListID)
//     dispatchTodolists(action)
//     dispatchTasks(action)
// }

// const updateTask = (todoListId: string, taskId: string, title: string) => {
//     dispatchTasks(updateTasksAC(todoListId, taskId, title))
// }

// const updateTodolist = (todoListId: string, title: string) => {
//     dispatchTodolists(updateTodolistAC(todoListId, title))
// }

// const addTodolist = (title: string) => {
//     const action = addTodolistAC(title)
//     dispatchTodolists(action)
//     dispatchTasks(action)
// }

//     let todoListContent = todolists.length !== 0 
//     ? 
//     todolists.map(el => {
//     let taskForTodoList = tasks[el.id]
//     if(el.filter === "active") {
//         taskForTodoList = tasks[el.id].filter(el => el.isDone === false)
//     }
//     else if(el.filter === "completed") {
//         taskForTodoList = tasks[el.id].filter(el => el.isDone === true)
//     }

//     const TodolistMemo = React.memo(TodoList)
//     return (
//     <Grid item>
//         <Paper elevation={5} >
//         <TodolistMemo 
//             title={el.title} 
//             tasks={taskForTodoList} 
//             deleteTasks={deleteTasks} 
//             deleteTodolist={deleteTodolist}
//             changeTasks={changeTasks} 
//             addTask={addTask}
//             filter={el.filter}
//             todoListId={el.id}
//             changeTaskStatus={changeTaskStatus}
//             updateTask={updateTask}
//             updateTodolist={updateTodolist}
//         />
//         </Paper>
//     </Grid>
//     )
// }) 
// : 
// <div className='container-title'><span className='title'>Список задач пуст</span></div>


// return (
//     <div className="App">
//     <ButtonAppBar />
//         <Container fixed>
//         <Grid container >
//             <Paper elevation={3} />
//                 <AddItemForm callBack={addTodolist}/>
//             <Paper />
//         </Grid>
//         <Grid container spacing={3}>
//             {todoListContent}
//         </Grid>
//         </Container>
//     </div>
// );

// }

// export default AppWithReducer;
