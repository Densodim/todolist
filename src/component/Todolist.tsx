import React, {memo, useCallback} from "react";

import {FilterValuesType, TaskStateType} from "../App";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan";

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import {Box, List} from "@mui/material";

import {filterButtonsConteinerSx} from './Todolist.styles';
import {Task} from "./Task";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {addTaskAC} from "../state/task-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolist-reducer";


type TodolistType = {
    title: string
    filter: string
    todolistId: string
}

export type TaskType = {
    id: string
    title: string
    isDane: boolean
}


export const Todolist = memo(({
                                  title,
                                  filter,
                                  todolistId,
                              }: TodolistType) => {

    const tasks: TaskStateType = useSelector<AppRootState, TaskStateType>((state) => state.tasks);
    const dispatch = useDispatch();

    let task = tasks[todolistId];

    const handleFilterTasksChange = useCallback((filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch]);
    const handlerRemoveTodolist = useCallback(() => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch]);

    const addTaskCallback = useCallback((title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch]);

    const handlerUpdateTodolistCallback = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch]);

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
                    <Task taskId={task.id} todolistId={todolistId} key={task.id}/>)
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

