import { title } from "process";
import React, { useState } from "react";
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
    id: number,
    title: string,
    isDone: boolean
}

type TodoPropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTasks: (id: number) => void
    changeTasks: (filter: filterValuesType) => void
}



export const TodoList = ({title, tasks, deleteTasks, changeTasks}: TodoPropsType) => {
    return (
        <div>
            <div className="todoList">
                <h3>{title}</h3>
                <div>
                    <input />
                    {/* <Button title="+"/> */}
                </div>
                <ul>
                    {tasks.map(el => {
                        return (
                            <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/><span>{el.title}</span>
                            <Button title="x" onClickHandler={() => deleteTasks(el.id)}/>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <Button title="All" onClickHandler={() => changeTasks("all")}/>
                    <Button title="Active" onClickHandler={() => changeTasks("active")}/>
                    <Button title="Completed" onClickHandler={() => changeTasks("completed")}/>
                </div>
            </div>
        </div>
    )
} 