import { title } from "process";
import React, { useState, KeyboardEvent } from "react";
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
    ? <ul>
            {tasks.map(el => {
                return (
                <li key={el.id}>
                    <input type="checkbox" checked={el.isDone}/><span>{el.title}</span>
                    <Button title="x" onClickHandler={() => deleteTasks(el.id)} />
                </li>
            )
        })}
        </ul> 
    : <span>Todolist empty</span>

    const [taskTitle, setTaskTitle] = useState('')

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle("")
    }

    

    return (
        <div>
            <div className="todoList">
                <h3>{title}</h3>
                <div>
                    <input
                        value={taskTitle} onChange={(e) => {
                        setTaskTitle(e.currentTarget.value)
                        }}
                        onKeyDown={(e) => {
                            if(e.key === "Enter" && taskTitle.trim()) {
                                addTaskHandler()
                            }
                        }}
                    />
                    <Button title="+" onClickHandler={addTaskHandler} isDisabled={!taskTitle.trim()}/>
                </div>
                    {tasksList}
                <div>
                    <Button title="All" onClickHandler={() => changeTasks("all")} />
                    <Button title="Active" onClickHandler={() => changeTasks("active")} />
                    <Button title="Completed" onClickHandler={() => changeTasks("completed")} />
                </div>
            </div>
        </div>
    )
} 