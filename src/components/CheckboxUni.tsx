import React, { ChangeEvent } from "react"; 
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

type CheckboxType = {
    isDone: boolean,
    callBack: (checkedValue: boolean) => void
}

export const CheckboxUni = (props: CheckboxType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <Checkbox 
            size='small'
            color='info'
            {...label} 
            defaultChecked 
            checked={props.isDone}
            onChange={onChangeHandler}
        />
    )
}