import React from "react";
import {Button} from "./Button";
import {FilterValuesType} from "../App";

type TodolistType = {
    title: string
    task: Array<TaskType>
    removeTask: (taskId:number)=>void
    changeFilter: (filter:FilterValuesType)=>void
}

export type TaskType = {
    id: number
    title: string
    isDane: boolean
}

export const Todolist = ({title, task, removeTask, changeFilter}: TodolistType) => {

    const taskElement: Array<JSX.Element> | JSX.Element =
        task.length !== 0 ?
            task.map(task => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDane}/>
                        <span>{task.title}</span>
                        <Button title={'x'} onClick={()=>{removeTask(task.id)}}/>
                        {/*<button onClick={()=>{removeTask(task.id)}}>x</button>*/}
                    </li>)
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
                        <Button title={'All'} onClick={()=>changeFilter('all')}/>
                        <Button title={'Active'} onClick={()=>changeFilter('active')}/>
                        <Button title={'Completed'} onClick={()=>changeFilter('completed')}/>
                    </div>
                </div>
            </div>
        </>
    )
}