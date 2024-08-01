import React, {memo, useCallback} from "react";

import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import {Box, List} from "@mui/material";

import {filterButtonsConteinerSx} from './Todolist.styles';
import {Task} from "./Task";


type TodolistType = {
    title: string
    task: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    updateTask: (newTitle: string, taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    filter: string
    todolistId: string
    removeTodolist: (todolistId: string) => void
    updateTodolist: (title: string, todolistId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDane: boolean
}


export const Todolist = memo(({
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
    console.log('Todolist is called');

    const handleFilterTasksChange = useCallback((filter: FilterValuesType) => {
        changeFilter(filter, todolistId);
    }, []);
    const handlerRemoveTodolist = useCallback(() => {
        removeTodolist(todolistId);
    }, []);

    const addTaskCallback = useCallback((title: string) => {
        addTask(title, todolistId);
    }, [addTask, todolistId]);

    const handlerUpdateTodolistCallback = useCallback((title: string) => {
        updateTodolist(title, todolistId)
    }, []);

    switch (filter) {
        case 'active':
            task = task.filter(task => !task.isDane);
            break;
        case 'completed':
            task = task.filter(task => task.isDane);
            break;
    }

    let taskElement =
        task.length !== 0 ?
            task.map(task => {
                return (
                    <Task removeTask={removeTask} changeTaskStatus={changeTaskStatus} updateTask={updateTask}
                          task={task} todolistId={todolistId} key={task.id}/>)
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
});

