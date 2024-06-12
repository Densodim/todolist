import React, {ChangeEvent, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "../App";

type TodolistType = {
    title: string
    task: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
    filter: string
}

export type TaskType = {
    id: string
    title: string
    isDane: boolean
}


export const Todolist = ({title, task, removeTask, changeFilter, addTask, changeTaskStatus, filter}: TodolistType) => {

    // const inputRef = useRef<HTMLInputElement>(null);

    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleAddTask = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title cannot be empty')
        }
    }
    const handleChangeTaskTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const handleAddTaskOnKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        error && setError(null)
        if (event.key === 'Enter') {
            handleAddTask()
        }
    }
    const handleFilterTasksChange = (filter: FilterValuesType) => {
        changeFilter(filter);
    }

    // const isAddTaskButtonDisabled = !Boolean(taskTitle.trim()) || taskTitle.length > 25;

    const userTaskTitleLengthWarning = taskTitle.length > 15 && <div>message exceeds 15 characters</div>;
    const userTaskEmptyTitleError = error && <div className={'error-message'}>{error}</div>


    const taskElement: Array<JSX.Element> | JSX.Element =
        task.length !== 0 ?
            task.map(task => {
                const handleRemoveTask = () => {
                    removeTask(task.id);
                }
                const handlerChangeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
                    const newTaskStatus = event.currentTarget.checked;
                    changeTaskStatus(task.id, newTaskStatus);
                }
                return (
                    <li key={task.id} className={task.isDane ? 'is-done' : ''}>
                        <input type="checkbox"
                               checked={task.isDane}
                               onChange={handlerChangeTaskStatus}
                        />
                        <span>{task.title}</span>

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
                    <h3>{title}</h3>
                    <div>
                        <input value={taskTitle}
                               onChange={handleChangeTaskTitle}
                               onKeyDown={handleAddTaskOnKey}
                               className={error ? 'error' : ''}
                        />
                        <Button title={'+'}
                            // disabled={isAddTaskButtonDisabled}
                                onClick={() => {
                                    handleAddTask()
                                }}
                        />
                        {userTaskEmptyTitleError}
                        {userTaskTitleLengthWarning}
                    </div>
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