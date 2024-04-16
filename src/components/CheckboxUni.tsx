import React, { ChangeEvent } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { TaskStatuses, TaskType } from '../api/todolist-api'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

type CheckboxType = {
    task: TaskType
    callBack: (checkedValue: boolean) => void
}

export const CheckboxUni = (props: CheckboxType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <Checkbox
            size="small"
            color="info"
            {...label}
            checked={props.task.status === TaskStatuses.Completed}
            onChange={onChangeHandler}
        />
    )
}
