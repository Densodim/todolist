import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType

export let todolistID1 = v1();
export let todolistID2 = v1();

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

export const todolistsReducer = (state: TodolistType[] = todolistInitialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const todoListId = action.payload.todolistId;
            const newTodoList: TodolistType = {id: todoListId, title: action.payload.title, filter: 'all'}
            return [
                newTodoList, ...state
            ]
        case 'CHANGE-TODOLIST-FILTER':
            const newTodolist = state.map(t1 => {
                return t1.id === action.payload.id ? {...t1, filter: action.payload.filter} : t1
            })
            return newTodolist
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        case 'REMOVE-TODOLIST':
            return state.filter(t1 => t1.id !== action.payload.id)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", payload: {id: id, title: title}}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", payload: {id: id, filter: filter}}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", payload: {title, todolistId: v1()}}
}