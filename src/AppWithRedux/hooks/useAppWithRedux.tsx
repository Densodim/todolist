import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {useCallback, useState} from "react";
import {addTodolistAC} from "../../state/todolist-reducer";
import {createTheme} from "@mui/material";
import {ThemeModeType, TodolistType} from "../AppWithRedux";

export const useAppWithRedux = () => {
    const dispatch = useDispatch();
    const todolist = useSelector<AppRootState, Array<TodolistType>>((state) => state.todolists);

    // Todolist
    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch]);


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
    return {
        theme,
        handlerChangeMode,
        addTodoList,
        todolist
    }
}