import React, {ChangeEvent, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistType = {
    title: string
    task: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    filter: string
    todolistId: string
    removeTodolist: (todolistId: string) => void
    updateTask:(newTitle:string, taskId:string, todolistId:string)=>void
    updateTodolist:(title:string, todolistId:string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDane: boolean
}


export const Todolist = ({
                             title,
                             task,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             todolistId,
                             removeTodolist,
                             updateTask,
                             updateTodolist
                         }: TodolistType) => {

    // const inputRef = useRef<HTMLInputElement>(null);


    const handleFilterTasksChange = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId);
    }
    const handlerRemoveTodolist = () => {
        removeTodolist(todolistId);
    }

    const addTaskCallback = (title:string)=> {
        addTask(title, todolistId);
    }
    const handlerUpdateTodolistCallback = (title:string)=>{
        updateTodolist(title, todolistId)
    }

    const taskElement =
        task.length !== 0 ?
            task.map(task => {
                const handleRemoveTask = () => {
                    removeTask(task.id, todolistId);
                }
                const handlerChangeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
                    const newTaskStatus = event.currentTarget.checked;
                    changeTaskStatus(task.id, newTaskStatus, todolistId);
                }
                const editaBlueSpan = (newTitle:string)=>{
                    updateTask(newTitle, task.id, todolistId)
                }
                return (
                    <li key={task.id} className={task.isDane ? 'is-done' : ''}>
                        <input type="checkbox"
                               checked={task.isDane}
                               onChange={handlerChangeTaskStatus}
                        />
                        <EditableSpan value={task.title} editaBlueSpan={editaBlueSpan}/>

                        <Button
                            title={'x'}
                            onClick={handleRemoveTask}
                        />

                        {/*<button onClick={()=>{removeTask(task.id)}}>x</button>*/}
                    </li>
                )
            }) : <span> Yaur tasklist is empty </span>

    return (
        <>
            <div className="App">
                <div className='todolist'>
                    <div className={'todolist-title-container'}>
                        <h3>
                            <EditableSpan value={title} editaBlueSpan={handlerUpdateTodolistCallback}/>
                        </h3>
                        <Button title={'x'} onClick={handlerRemoveTodolist}/>
                    </div>
                    <AddItemForm addItem={addTaskCallback}/>

                    <ul>
                        {taskElement}
                    </ul>
                    <div>
                        <Button
                            className={filter === 'all' ? 'active-filter' : ''}
                            title={'All'}
                            onClick={() => handleFilterTasksChange('all')}
                        />
                        <Button
                            className={filter === 'active' ? 'active-filter' : ''}
                            title={'Active'}
                            onClick={() => handleFilterTasksChange('active')}
                        />
                        <Button
                            className={filter === 'completed' ? 'active-filter' : ''}
                            title={'Completed'}
                            onClick={() => handleFilterTasksChange('completed')}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}