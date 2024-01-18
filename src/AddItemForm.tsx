import React, {KeyboardEvent, ChangeEvent, useState } from "react";
import './App.css';
import Button from '@mui/material/Button';
import { stylesButton } from "./components/Styled";
import TextField from '@mui/material/TextField';

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
                    <TextField 
                    size="small"
                    id="outlined-basic" 
                    value={taskTitle}
                    label={error ? error : taskTitle ? `Add task ${taskTitle}` : 'Add task...'}
                    variant="outlined"
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    error={!!error}
                    onBlur={() => setError(null)}
                    />
                    <Button 
                    onClick={addTaskHandler} 
                    variant="contained" 
                    color='info'
                    style={stylesButton}
                    >
                        +
                    </Button>
                </div>
    )
}