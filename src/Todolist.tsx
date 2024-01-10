import { title } from "process";
import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { filterValuesType } from "./App";
import { Button } from "./Button";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: filterValuesType
    todoListId: string

    deleteTasks: (todolistID: string, id: string) => void
    deleteTodolist: (todoListID: string) => void
    changeTasks: (taskTodoListID: string, filter: filterValuesType) => void
    addTask: (todoListID: string, newTitle: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, newIsDoneValue: boolean) => void

}


export const TodoList = ({
    title, 
    tasks,
    filter,
    todoListId,
    
    deleteTasks,
    deleteTodolist, 
    changeTasks, 
    addTask,
    changeTaskStatus,
}: TodoPropsType) => {

    

    const tasksList: JSX.Element = tasks.length !== 0 
    ?   <ul>
            {tasks.map(el => {
                return (
                <li key={el.id}>
                    <input
                        type="checkbox" 
                        checked={el.isDone}
                        onChange={(e) => changeTaskStatus(todoListId, el.id, e.currentTarget.checked)}
                    />
                    <span className={el.isDone ? "task-done" : "task-active"}>{el.title}</span>
                    <Button title="x" onClickHandler={() => deleteTasks(todoListId, el.id)} />
                </li>
            )
        })}
        </ul> 
    : <span className="filter_span">{filter === "active" 
        ? "The list of active tasks is empty" 
        : filter === "completed" ? "The list of completed tasks is empty" : "Task list is empty"}
    </span>

    // const [taskTitle, setTaskTitle] = useState('')
    // const [error, setError] = useState<string | null>(null)

    // const addTaskHandler = () => {
    //     if(taskTitle.trim()) {
    //         addTask(todoListId, taskTitle)
    //         setTaskTitle("")
    //     }
    //     else {
    //         setError('Error - empty string')
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setError(null)
    //     setTaskTitle(e.currentTarget.value)
    // }

    // const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if(e.key === "Enter" && taskTitle.trim()) {
    //         addTaskHandler()
    //     }
    //     else {
    //         setError('Error - empty string')
    //     }
    // }

    const onClickAllHandler = () => changeTasks(todoListId, 'all')
    const onClickActiveHandler = () => changeTasks(todoListId, 'active')
    const onClickCompletedHandler = () => changeTasks(todoListId, 'completed')

    const deleteTodolistsHandler = () => {
        deleteTodolist(todoListId)
    }

    return (
        <div>
            <div className="todoList">
                    <h3 className="title-todolist">{title}</h3>
                    <AddItemForm addTask={addTask} todoListId={todoListId}/>
                        <Button 
                        title="x" 
                        className="delete-todolist" 
                        onClickHandler={deleteTodolistsHandler}
                        />
                    {tasksList}
                <div>
                    <Button 
                        className={filter === "all" ? "active-filter" : "isActive-filter"} 
                        title="All" 
                        onClickHandler={onClickAllHandler} 
                    />
                    <Button 
                        className={filter === "active" ? "active-filter" : "isActive-filter"} 
                        title="Active" 
                        onClickHandler={onClickActiveHandler} 
                    />
                    <Button 
                        className={filter === "completed" ? "active-filter" : "isActive-filter"} 
                        title="Completed" 
                        onClickHandler={onClickCompletedHandler} 
                    />
                </div>
            </div>
        </div>
    )
} 