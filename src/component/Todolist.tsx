import React, {ChangeEvent, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "../App";

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
                             removeTodolist
                         }: TodolistType) => {

    // const inputRef = useRef<HTMLInputElement>(null);

    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleAddTask = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim(), todolistId)
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
        changeFilter(filter, todolistId);
    }
    const handlerRemoveTodolist = () => {
        removeTodolist(todolistId);
    }

    const userTaskTitleLengthWarning = taskTitle.length > 15 && <div>message exceeds 15 characters</div>;
    const userTaskEmptyTitleError = error && <div className={'error-message'}>{error}</div>


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
                    <div className={'todolist-title-container'}>
                        <h3>{title}</h3>
                        <Button title={'x'} onClick={handlerRemoveTodolist}/>
                    </div>
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