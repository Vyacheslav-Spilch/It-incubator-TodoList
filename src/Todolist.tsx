import React, { useState } from "react";
import { Button } from "./Button";

let tasks1 = [
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
]

let tasks2 = [
    {id: 1, title: "Terminator", isDone: true},
    {id: 2, title: "XXX", isDone: false},
    {id: 3, title: "Gentlemen of fortune", isDone: true},
]

type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodoPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: Function
}



export const TodoList = (props: TodoPropsType) => {
    const [] = useState()
    return (
        <div>
            <div className="todoList">
                <h3>{props.title}</h3>
                <div>
                    <input />
                    <Button title="+"/>
                </div>
                <ul>
                    {props.tasks.map((el, index) => {
                        return (
                            <li key={index}>
                            <input type="checkbox" checked={el.isDone}/><span>{el.title}</span>
                            <button onClick={() => props.removeTask(el.id)}>X</button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <Button title="All"/>
                    <Button title="Active"/>
                    <Button title="Completed"/>
                </div>
            </div>
        </div>
    )
} 