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

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistFilterActionType |ChangeTodolistTitleActionType


export const todolistsReducer = (state: TodolistType[], action: ActionsType):TodolistType[] => {

    switch (action.type) {
        case 'ADD-TODOLIST':
            const todoListId = v1();
            const newTodoList: TodolistType = {id: todoListId, title: action.payload.title, filter: 'all'}
            return [
                ...state, newTodoList
            ]
        case 'CHANGE-TODOLIST-FILTER':
            const newTodolist = state.map(t1 => {
                return t1.id === action.payload.id ? {...t1, filter:action.payload.filter} : t1
            })
            return newTodolist
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.id ? {...el, title:action.payload.title} : el)
        case 'REMOVE-TODOLIST':
            return state.filter(t1 => t1.id !== action.payload.id)
        default:
            throw new Error('Unknown action type');
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const
}

export const changeTodolistTitleAC = (id:string, title:string):ChangeTodolistTitleActionType=>{
    return {type:"CHANGE-TODOLIST-TITLE", payload:{id:id, title:title}}
}

export const changeTodolistFilterAC = (id:string, filter:FilterValuesType):ChangeTodolistFilterActionType=>{
    return {type:"CHANGE-TODOLIST-FILTER", payload:{id:id, filter:filter}}
}

export const addTodolistAC = (title:string):AddTodolistActionType=> {
    return {type:"ADD-TODOLIST", payload:{title:title}}
}