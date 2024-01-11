import React, {KeyboardEvent, ChangeEvent, useState } from "react";
import { Button } from "./Button";
import './App.css';

type AddItemFormProps = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: AddItemFormProps) => {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if(taskTitle.trim()) {
            props.callBack(taskTitle)
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
        setError(null)
        if(e.key === "Enter" && taskTitle.trim()) {
            addTaskHandler()
        }
        else {
            setError('Error - empty string')
        }
    }

    return (
        <div className="input_and_btn">
                    <input
                        value={taskTitle} 
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                        className={error ? "error input" : "input"}
                    />
                    <Button title="+" onClickHandler={addTaskHandler} isDisabled={!taskTitle} className={"btn-add-task"}/>
                    {error && <div className="error-message">{error}</div>}
                </div>
    )
}