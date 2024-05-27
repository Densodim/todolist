import React from "react";
import {Button} from "./Button";

type TodolistType = {
    title: string
    task: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDane: boolean
}

export const Todolist = ({title, task}: TodolistType) => {

    const taskElement:Array<JSX.Element> | JSX.Element =
        task.length !== 0 ?
        task.map(task => {
        return (<li><input type="checkbox" checked={task.isDane}/> <span>{task.title}</span></li>)
    }) : <span> Yaur tasklist is empty </span>

    return (
        <>
            <div className="App">
                <div className='todolist'>
                    <h3>{title}</h3>
                    <div>
                        <input/>
                        <Button title={'+'}/>
                    </div>
                    <ul>
                        {taskElement}
                    </ul>
                    <div>
                        <Button title={'All'}/>
                        <Button title={'Active'}/>
                        <Button title={'Completed'}/>
                    </div>
                </div>
            </div>
        </>
    )
}