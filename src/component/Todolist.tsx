import React, {ChangeEvent, useState} from "react";

import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import {Box, Checkbox, List, ListItem} from "@mui/material";

import {filterButtonsConteinerSx, getListItemSx} from './Todolist.styles';


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
    updateTask: (newTitle: string, taskId: string, todolistId: string) => void
    updateTodolist: (title: string, todolistId: string) => void
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

    const addTaskCallback = (title: string) => {
        addTask(title, todolistId);
    }
    const handlerUpdateTodolistCallback = (title: string) => {
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
                const editaBlueSpan = (newTitle: string) => {
                    updateTask(newTitle, task.id, todolistId)
                }
                return (

                    <ListItem
                        key={task.id}
                        disableGutters
                        disablePadding
                        sx={getListItemSx(task.isDane)}
                    >
                        <div>
                            <Checkbox checked={task.isDane} onChange={handlerChangeTaskStatus}/>
                            <EditableSpan value={task.title} editaBlueSpan={editaBlueSpan}/>
                        </div>
                        <IconButton onClick={handleRemoveTask}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>
                )
            })
            :
            <span> Yaur tasklist is empty </span>

    return (
        <>
            <div className="App">
                <Box sx={filterButtonsConteinerSx}>
                    <h3>
                        <EditableSpan value={title} editaBlueSpan={handlerUpdateTodolistCallback}/>
                    </h3>
                    <IconButton onClick={handlerRemoveTodolist}>
                        <DeleteIcon/>
                    </IconButton>
                </Box>
                <AddItemForm addItem={addTaskCallback}/>

                <List>
                    {taskElement}
                </List>
                <div>
                    <Button
                        variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => handleFilterTasksChange('all')}
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => handleFilterTasksChange('active')}
                    >
                        Active
                    </Button>
                    <Button
                        variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => handleFilterTasksChange('completed')}
                    >
                        Completed
                    </Button>
                </div>

            </div>
        </>
    )
}