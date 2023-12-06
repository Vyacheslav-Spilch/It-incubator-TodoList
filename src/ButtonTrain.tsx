import React from "react";
import { ButtonUniv } from "./components/ButtonUniv";

export const ButtonTrain = () => {
    const button1foo = (name: string) => {
        console.log(name);
    }
    const button2foo = (name: string) => {
        console.log(name);
    }

    return (
        <>
            <ButtonUniv title="MyYouTubeChannel 1" callBack={() => button1foo("vasily")}/>
            <ButtonUniv title="MyYouTubeChannel 2" callBack={() => button2foo("anton")}/>
        </>
    )
}