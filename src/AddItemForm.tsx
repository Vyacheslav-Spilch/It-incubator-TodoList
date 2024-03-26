import React, {KeyboardEvent, ChangeEvent, useState } from "react";
import './App.css'
import Button from '@mui/material/Button';
import { stylesButton } from "./components/Styled";
import TextField from '@mui/material/TextField';
import { filterValuesType } from "./AppWithRedux";

export type AddItemFormProps = {
    callBack: (title: string) => void
    filter?: filterValuesType
}

export const AddItemForm = React.memo((props: AddItemFormProps) => {
    
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if(taskTitle.trim()) {
            props.callBack(taskTitle)
            setTaskTitle("")
        }
        else {
            setError('Error - empty string')
            setTaskTitle('')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error) {
            setError(null)
        }
        if(e.key === "Enter") {
            addTaskHandler()
        }
    }


    return (
        <div className="input_and_btn">
                    <TextField 
                    size="small"
                    id="outlined-basic" 
                    value={taskTitle}
                    label={error ? error : 'Add task...'}
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
})