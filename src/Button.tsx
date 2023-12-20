import React from "react";


export type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    isDisabled?: boolean
}

export const Button = ({title, onClickHandler, isDisabled}: ButtonPropsType) => {
    return (
        <button 
        onClick={onClickHandler}
        disabled={isDisabled}
        >{title}</button>
    )
}