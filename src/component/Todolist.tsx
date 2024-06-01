import React, {ChangeEvent, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "../App";

type TodolistType = {
    title: string
    task: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDane: boolean
}


export const Todolist = ({title, task, removeTask, changeFilter, addTask}: TodolistType) => {

    // const inputRef = useRef<HTMLInputElement>(null);

    const [taskTitle, setTaskTitle] = useState('');


    const handleAddTask = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const handleChangeTaskTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const handleAddTaskOnKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddTask()
        }
    }
    const handleFilterTasksChange = (filter: FilterValuesType) => {
        changeFilter(filter);
    }


    const taskElement: Array<JSX.Element> | JSX.Element =
        task.length !== 0 ?
            task.map(task => {
                const handleRemoveTask = () => {
                    removeTask(task.id);
                }
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDane}/>
                        <span>{task.title}</span>
                        <Button title={'x'} onClick={handleRemoveTask}/>
                        {/*<button onClick={()=>{removeTask(task.id)}}>x</button>*/}
                    </li>)
            }) : <span> Yaur tasklist is empty </span>

    return (
        <>
            <div className="App">
                <div className='todolist'>
                    <h3>{title}</h3>
                    <div>
                        <input value={taskTitle}
                               onChange={handleChangeTaskTitle}
                               onKeyUp={handleAddTaskOnKey}/>
                        <Button title={'+'} onClick={() => {
                            handleAddTask()
                        }}/>
                    </div>
                    <ul>
                        {taskElement}
                    </ul>
                    <div>
                        <Button title={'All'} onClick={() => handleFilterTasksChange('all')}/>
                        <Button title={'Active'} onClick={() => handleFilterTasksChange('active')}/>
                        <Button title={'Completed'} onClick={() => handleFilterTasksChange('completed')}/>
                    </div>
                </div>
            </div>
        </>
    )
}