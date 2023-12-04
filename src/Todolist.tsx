import React from "react";
import { Button } from "./Button";

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
    return (
        <div>
            <div className="todoList">
                <h3>{props.title}</h3>
                <div>
                    <input />
                    <Button title="+"/>
                </div>
                <ul>
                    <li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                    <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                    <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[1].title}</span></li>
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