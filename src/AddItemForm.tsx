import React, {KeyboardEvent, ChangeEvent, useState } from "react";
import './App.css';
import Button from '@mui/material/Button';
import { stylesButton } from "./components/Styled";

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
                        onBlur={() => setError(null)}
                        autoFocus
                    />
                    <Button 
                    onClick={addTaskHandler} 
                    variant="contained" 
                    color='info'
                    style={stylesButton}
                    >
                        +
                    </Button>
                    {error && <div className="error-message">{error}</div>}
                </div>
    )
}