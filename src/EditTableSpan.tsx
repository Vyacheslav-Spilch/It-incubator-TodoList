import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField'

type EditTableSpanProps = {
    oldTitle: string
    callBack: (title: string) => void
}

export const EditTableSpan = React.memo((props: EditTableSpanProps) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            addTask()
        }
    }

    const changeEditHAndler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(newTitle)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            editHandler()
        }
    }

    return edit ? (
        <TextField
            size="small"
            id="standard-basic"
            label="Внести изменения"
            variant="standard"
            value={newTitle}
            type="text"
            className="input"
            onBlur={editHandler}
            onKeyDown={onKeyDownHandler}
            autoFocus
            onChange={changeEditHAndler}
        />
    ) : (
        <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    )
})
