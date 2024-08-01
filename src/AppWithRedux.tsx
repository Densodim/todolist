import React, {useCallback, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./component/Todolist";
import {AddItemForm} from "./component/AddItemForm";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Container, createTheme, CssBaseline, Grid, Paper, Switch, ThemeProvider} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import {tolbarSx} from './component/Todolist.styles';
import {MenuButton} from './component/MenuButton';
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

type ThemeModeType = 'dark' | 'light'

function AppWithRedux() {

    const dispatch = useDispatch();

    const todolist = useSelector<AppRootState, Array<TodolistType>>((state) => state.todolists);

    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks);

    // task
    const removeTask = useCallback((taskId: string, todolistId: string) => {
        const action = removeTaskAC(todolistId, taskId);
        dispatch(action);
    }, []);
    const addTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }, []);
    const changeTaskStatus = useCallback((taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, taskStatus));
    }, []);
    const updateTask = useCallback((newTitle: string, taskId: string, todolistId: string) => {
        dispatch(updateTaskAC(todolistId, taskId, newTitle));
    }, []);

    // Todolist
    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    }, []);
    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action);
    }, []);
    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, []);

    const updateTodolist = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }, []);

    //style
    const [themeMode, setThemeMode] = useState<ThemeModeType>();
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#efc700',
            }
        }
    });
    const handlerChangeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (

        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position={"static"} sx={{mb: '30px'}}>
                <Toolbar sx={tolbarSx}>
                    <IconButton color={'inherit'}>
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={'default'} onChange={handlerChangeMode}/>
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{mb: '30px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid2 container spacing={2}>
                    {todolist.map(t1 => {
                        let allTodoListTasks = tasks[t1.id]
                        let taskForTodolist = allTodoListTasks;


                        return (
                            <Grid2>
                                <Paper sx={{p: '0 20px 20px 20px'}}>
                                    <Todolist
                                        key={t1.id}
                                        title={t1.title}
                                        task={taskForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        todolistId={t1.id}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={t1.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolist={updateTodolist}
                                    />
                                </Paper>
                            </Grid2>
                        )
                    })}
                </Grid2>
            </Container>

        </ThemeProvider>
    );
}

export default AppWithRedux;
