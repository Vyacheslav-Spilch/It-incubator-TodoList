import React from "react";
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { AddItemForm } from "./AddItemForm";
// import { filterValuesType } from "./AppWithRedux";
// import { EditTableSpan } from "./EditTableSpan";
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// // import React, { ChangeEvent } from 'react';
// import { CheckboxUni } from './components/CheckboxUni';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppRootStateType } from './state/store';
// import { addTaskAC, changeTaskStatusAC, deleteTasksAC, updateTasksAC } from './state/tasks-reducer';
// import { changeFilterAC, removeTodolistAC, updateTodolistAC } from './state/todolist-reducer';
// import { useCallback } from 'react';
// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


// export type TaskType = {
//     id: string,
//     title: string,
//     isDone: boolean
// }

// type TodoPropsType = {
//     todoListId: string
//     title: string
//     filter: filterValuesType
// }

// export const TodoListWithRedux: React.FC<TodoPropsType> = ({
//     todoListId,
//     title, 
//     filter,
// }) => {
//     let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoListId])
//     let dispatch = useDispatch()


//     const onClickAllHandler = () => dispatch(changeFilterAC(todoListId, 'all'))
//     const onClickActiveHandler = () => dispatch(changeFilterAC(todoListId, 'active'))
//     const onClickCompletedHandler = () => dispatch(changeFilterAC(todoListId, 'completed'))

//     if(filter === 'active') {
//         tasks = tasks.filter(el => el.isDone === false)
//     }
//     else if(filter === 'completed') {
//         tasks = tasks.filter(el => el.isDone === true)
//     }

//     const tasksList: JSX.Element = tasks.length !== 0 
//     ?   <ul>
//             {tasks.map((el: TaskType) => {

//             const updateTaskHandler = (title: string) => {
//                 dispatch(updateTasksAC(todoListId, el.id, title))
//             }
//             const onChangeTaskHandler = (checkedValue: boolean) => {
//                 dispatch(changeTaskStatusAC(todoListId, el.id, checkedValue))
//             }

//                 return (
//                 <li key={el.id}>
//                     <CheckboxUni 
//                         isDone={el.isDone} 
//                         callBack={onChangeTaskHandler}
//                     />
//                     <EditTableSpan 
//                         oldTitle={el.title} 
//                         isDone={el.isDone} 
//                         callBack={updateTaskHandler}
//                     />
//                     <IconButton 
//                         aria-label="delete" 
//                         onClick={() => dispatch(deleteTasksAC(todoListId, el.id))}
//                     >
//                     <DeleteIcon className='delete-todolist'/>
//                     </IconButton>
//                 </li>
//             )
//         })}
//         </ul> 
//     : filter === "all" 
//     ? <span className="filter_span">Task list is empty</span> 
//     : <span className="filter_span">The list of {filter} is empty</span>


//     const deleteTodolistsHandler = () => {
//         dispatch(removeTodolistAC(todoListId))
//     }

//     const addTaskHandler = useCallback((title: string) => {
//         dispatch(addTaskAC(todoListId, title))        
//         dispatch(changeFilterAC(todoListId, 'all'))
//     }, [])

//     const updateTodolistHandler = (title: string) => {
//         dispatch(updateTodolistAC(todoListId, title))
//     }

//     return (
//         <div className="todoList">
//             <div>
//                     <h3>
//                         <EditTableSpan oldTitle={title} callBack={updateTodolistHandler}/> 
//                         <IconButton aria-label="delete" onClick={deleteTodolistsHandler}>
//                             <DeleteIcon className='delete-todolist'/>
//                         </IconButton>
//                     </h3>
//                         <AddItemForm filter={filter} callBack={addTaskHandler}/>
//                         {tasksList}
//                 <div>
//                 <Button 
//                     variant={filter === 'all' ? 'contained' : 'outlined'} 
//                     color='info'
//                     onClick={onClickAllHandler}
//                     >
//                     All
//                 </Button>
//                 <Button 
//                     variant={filter === 'active' ? 'contained' : 'outlined'} 
//                     color='info' 
//                     onClick={onClickActiveHandler}
//                     >
//                     Active
//                 </Button>
//                 <Button 
//                     variant={filter === 'completed' ? 'contained' : 'outlined'} 
//                     color='info'
//                     onClick={onClickCompletedHandler}
//                     >
//                     Completed
//                 </Button>
//                 </div>
//             </div>
//         </div>
//     )
// } 