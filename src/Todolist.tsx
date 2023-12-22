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

    deleteTasks: (id: string) => void
    changeTasks: (filter: filterValuesType) => void
    addTask: (newTitle: string) => void
}


export const TodoList = ({
    title, 
    tasks, 
    deleteTasks, 
    changeTasks, 
    addTask,
}: TodoPropsType) => {

    const tasksList: JSX.Element = tasks.length !== 0 
    ?   <ul>
            {tasks.map(el => {
                return (
                <li key={el.id}>
                    <input type="checkbox" checked={el.isDone}/><span>{el.title}</span>
                    <Button title="x" onClickHandler={() => deleteTasks(el.id)} />
                </li>
            )
        })}
        </ul> 
    : <span>Todo list empty</span>

    const [taskTitle, setTaskTitle] = useState('')


    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && taskTitle.trim()) {
            addTaskHandler()
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
                    />
                    <Button title="+" onClickHandler={addTaskHandler} isDisabled={!taskTitle.trim()}/>
                </div>
                    {tasksList}
                <div>
                    <Button title="All" onClickHandler={onClickAllHandler} />
                    <Button title="Active" onClickHandler={onClickActiveHandler} />
                    <Button title="Completed" onClickHandler={onClickCompletedHandler} />
                </div>
            </div>
        </div>
    )
} 