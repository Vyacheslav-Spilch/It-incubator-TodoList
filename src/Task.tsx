import React, { useCallback } from "react";
import './App.css';
import { CheckboxUni } from "./components/CheckboxUni";
import { IconButton } from "@mui/material";
import { EditTableSpan } from "./EditTableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskStatuses, TaskType } from "./api/todolist-api";
// import { TaskType } from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todoListId: string

    deleteTasks: (todolistID: string, id: string) => void
    updateTaskTitle: (todoListId: string,taskId: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
}

export const Task = React.memo(({
    task, 
    todoListId, 
    deleteTasks, 
    updateTaskTitle, 
    changeTaskStatus
    }: TaskPropsType) => {

    const updateTaskHandler = useCallback((title: string) => {
        updateTaskTitle(todoListId, task.id, title)
    }, [updateTaskTitle, todoListId, task.id])
    const onChangeTaskHandler = useCallback((checkedValue: boolean) => {
        changeTaskStatus(todoListId, task.id, checkedValue ? TaskStatuses.Completed : TaskStatuses.New)
    }, [changeTaskStatus, todoListId, task.id])
        
    return (
        <li key={task.id}>
            <CheckboxUni
                task={task}
                callBack={onChangeTaskHandler}
            />
            <EditTableSpan oldTitle={task.title} callBack={updateTaskHandler}/>
            <IconButton aria-label="delete" onClick={() => deleteTasks(todoListId, task.id)}>
                <DeleteIcon className='delete-todolist'/>
            </IconButton>
        </li>
    )
})