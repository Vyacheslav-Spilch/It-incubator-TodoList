import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import './App.css';

type EditTableSpanProps = {
    oldTitle: string
    isDone?: boolean
    callBack: (title: string) => void
}



export const EditTableSpan = (props: EditTableSpanProps) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setnewTitle] = useState(props.oldTitle)

    const editHandler = () => {
        setEdit(!edit)
        if(edit) {
            addTask()
        }
    }

    const changeEditHAndler = (e: ChangeEvent<HTMLInputElement>) => {
        setnewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(newTitle)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            editHandler()
        }
    }

    return (
        edit 
        ? <input 
        value={newTitle} 
        type="text" 
        className="input"
        onBlur={editHandler}
        onKeyDown={onKeyDownHandler}
        autoFocus
        onChange={changeEditHAndler}/> 
        : <span onDoubleClick={editHandler} className={props.isDone ? "task-done" : "task-active"}>{props.oldTitle}</span>
    )
}