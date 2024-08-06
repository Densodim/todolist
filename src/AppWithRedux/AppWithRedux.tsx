import React from 'react';
import '../App.css';
import {TaskType, Todolist} from "../component/Todolist";
import {AddItemForm} from "../component/AddItemForm/AddItemForm";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Container, CssBaseline, Grid, Paper, Switch, ThemeProvider} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import {tolbarSx} from '../component/Todolist.styles';
import {MenuButton} from '../component/MenuButton';
import {useAppWithRedux} from "./hooks/useAppWithRedux";


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

export type ThemeModeType = 'dark' | 'light'

function AppWithRedux() {
    const {
        theme,
        handlerChangeMode,
        addTodoList,
        todolist
    } = useAppWithRedux();

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
                        return (
                            <Grid2>
                                <Paper sx={{p: '0 20px 20px 20px'}}>
                                    <Todolist
                                        key={t1.id}
                                        title={t1.title}
                                        todolistId={t1.id}
                                        filter={t1.filter}
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
