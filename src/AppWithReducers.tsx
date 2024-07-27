import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./component/Todolist";
import {v1} from 'uuid'
import {AddItemForm} from "./component/AddItemForm";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Container, createTheme, CssBaseline, Grid, Paper, Switch, ThemeProvider} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import {tolbarSx} from './component/Todolist.styles';
import {MenuButton} from './component/MenuButton';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, taskReducer, updateTaskAC} from "./state/task-reducer";


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

function AppWithReducers() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let todolistInitialState: TodolistType[] = [
        {
            id: todolistID1,
            title: 'What to learn',
            filter: 'all',
        },
        {
            id: todolistID2,
            title: 'What to buy',
            filter: 'all',
        }
    ]

    let [todolist, dispatchTodolistReducer] = useReducer(todolistsReducer, todolistInitialState);

    // global state

    let [tasks, dispatchTaskReducer] = useReducer(taskReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDane: true},
            {id: v1(), title: 'JS', isDane: true},
            {id: v1(), title: 'ReactJS', isDane: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDane: true},
            {id: v1(), title: 'GraphQL', isDane: false},
        ]
    });

    // task
    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(todolistId, taskId);
        dispatchTaskReducer(action);
    }
    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatchTaskReducer(action);
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatchTaskReducer(changeTaskStatusAC(todolistId, taskId, taskStatus));
    }
    const updateTask = (newTitle: string, taskId: string, todolistId: string) => {
        dispatchTaskReducer(updateTaskAC(todolistId, taskId, newTitle));
    }

    // Todolist
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatchTodolistReducer(changeTodolistFilterAC(todolistId, filter));
        }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchTodolistReducer(action);
        dispatchTaskReducer(action);
    }
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title);
        dispatchTodolistReducer(action);
        dispatchTaskReducer(action);
    }
    const updateTodolist = (title: string, todolistId: string) => {
        dispatchTodolistReducer(changeTodolistTitleAC(todolistId, title));
    }

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
                        const allTodoListTasks = tasks[t1.id]
                        let taskForTodolist = allTodoListTasks;

                        switch (t1.filter) {
                            case 'active':
                                taskForTodolist = taskForTodolist.filter(task => !task.isDane);
                                break;
                            case 'completed':
                                taskForTodolist = taskForTodolist.filter(task => task.isDane);
                                break;
                        }
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

export default AppWithReducers;
