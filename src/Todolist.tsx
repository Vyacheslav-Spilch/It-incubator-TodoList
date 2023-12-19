import { title } from "process";
import React, { useRef, useState } from "react";
import { filterValuesType } from "./App";
import { Button } from "./Button";

// let tasks1 = [
//     {id: 1, title: "CSS", isDone: true},
//     {id: 2, title: "JS", isDone: true},
//     {id: 3, title: "React", isDone: false},
// ]

// let tasks2 = [
//     {id: 1, title: "Terminator", isDone: true},
//     {id: 2, title: "XXX", isDone: false},
//     {id: 3, title: "Gentlemen of fortune", isDone: true},
// ]

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
    addTask
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

    return (
        <div>
            <div className="todoList">
                <h3>{title}</h3>
                <div>
                    <input
                        value={taskTitle} onChange={(e) => {
                        setTaskTitle(e.currentTarget.value)
                    }}/>
                    <Button title="+" onClickHandler={() => addTask(taskTitle)}/>
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