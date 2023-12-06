type BtnPropsType = {
    title: string
    callBack: () => void 
}

export const ButtonUniv = (props: BtnPropsType) => {
    const OnclickHandler = () => {
        props.callBack()
    }
    return (
        <>
            <button onClick={OnclickHandler}>{props.title}</button>
        </>
    )
}