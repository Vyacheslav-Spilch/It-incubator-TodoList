export type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    isDisabled?: boolean
    className?: string
}

export const Button = ({title, onClickHandler, isDisabled, className}: ButtonPropsType) => {
    return (
        <button 
        onClick={onClickHandler}
        disabled={isDisabled}
        className={className}
        >{title}</button>
    )
}