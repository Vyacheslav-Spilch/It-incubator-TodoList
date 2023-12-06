import React from "react";
import { Button } from "./Button";
import { ButtonTrain } from "./ButtonTrain";

export let tasks1 = [
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
]

export let tasks2 = [
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
}



export const TodoList = (props: TodoPropsType) => {
    const listItems: Array<JSX.Element> = []
    for(let i = 0; i < props.tasks.length; i++) {
        const listItem = <li>
        <input type="checkbox" checked={props.tasks[i].isDone}/><span>{props.tasks[i].title}</span>
        </li>
        listItems.push(listItem)
    }
    return (
        <div>
            <div className="todoList">
                <h3>{props.title}</h3>
                <div>
                    <input />
                    <Button title="+"/>
                </div>
                <ul>
                    {listItems}
                </ul>
                <div>
                    <Button title="All"/>
                    <Button title="Active"/>
                    <Button title="Completed"/>
                    <ButtonTrain />
                </div>
            </div>
        </div>
    )
} 