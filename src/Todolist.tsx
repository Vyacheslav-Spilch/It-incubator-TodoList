import { title } from "process";
import React, { useState, KeyboardEvent, ChangeEvent } from "react";
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

    deleteTasks: (id: string) => void
    changeTasks: (filter: filterValuesType) => void
    addTask: (newTitle: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}


export const TodoList = ({
    title, 
    tasks,
    filter,
    deleteTasks, 
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
                        onChange={(e) => changeTaskStatus(el.id, e.currentTarget.checked)}
                    />
                    <span>{el.title}</span>
                    <Button title="x" onClickHandler={() => deleteTasks(el.id)} />
                </li>
            )
        })}
        </ul> 
    : <span>{filter === "active" 
        ? "The list of active tasks is empty" 
        : filter === "completed" ? "The list of completed tasks is empty" : "Task list is empty"}</span>

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if(taskTitle.trim()) {
            addTask(taskTitle)
            setTaskTitle("")
        }
        else {
            setError('Error - empty string')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && taskTitle.trim()) {
            addTaskHandler()
        }
        else {
            setError('Error - empty string')
        }
    }

    const onClickAllHandler = () => changeTasks('all')
    const onClickActiveHandler = () => changeTasks('active')
    const onClickCompletedHandler = () => changeTasks('completed')

    return (
        <div>
            <div className="todoList">
                <h3>{title}</h3>
                <div>
                    <input
                        value={taskTitle} onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                        className={error ? "error" : ""}
                    />
                    <Button title="+" onClickHandler={addTaskHandler} isDisabled={!taskTitle}/>
                    {error && <div className="error-message">{error}</div>}
                </div>
                    {tasksList}
                <div>
                    <Button className={filter === "all" ? "active-filter" : ""} title="All" onClickHandler={onClickAllHandler} />
                    <Button className={filter === "active" ? "active-filter" : ""} title="Active" onClickHandler={onClickActiveHandler} />
                    <Button className={filter === "completed" ? "active-filter" : ""} title="Completed" onClickHandler={onClickCompletedHandler} />
                </div>
            </div>
        </div>
    )
} 