import {v1} from "uuid";
import {TaskStateType} from "../App";


type addTaskType = {
    type: 'ADD_TASK'
    payload: {
        title: string
        todolistId: string
    }
}
type removeTaskType = {
    type: "REMOVE_TASK";
    payload: {
        todolistId: string;
        taskId: string;
    };
}

export type changeTaskStatus = {
    type: "CHANGE_TASK_STATUS";
    payload: {
        taskId: string;
        todolistId: string;
        taskStatus: boolean;
    };
}
export type updateTaskType = {
    type: "UPDATE_TASK";
    payload: {
        todolistId: string;
        taskId: string;
        newTitle: string;
    };
}

type ActionsType = addTaskType | removeTaskType | changeTaskStatus | updateTaskType

export const taskReducer = (state: TaskStateType, action: ActionsType):TaskStateType => {
    switch (action.type) {
        case 'ADD_TASK':
            const newTask = {id: v1(), title: action.payload.title, isDane: false}
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        case "REMOVE_TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        case "CHANGE_TASK_STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId
                    ? {
                        ...el,
                        isDane: action.payload.taskStatus
                    } : el)
            }
        case "UPDATE_TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTitle}
                    : el)
            }
        default:
            throw new Error('Unknown action type')
    }
}

export const addTaskAC = (title: string, todolistId: string): addTaskType => {
    return {type: "ADD_TASK", payload: {title: title, todolistId: todolistId}}
}
export const removeTaskAC = (todolistId: string, taskId: string): removeTaskType => {
    return {type: "REMOVE_TASK", payload: {todolistId: todolistId, taskId: taskId}}
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, taskStatus: boolean): changeTaskStatus => {
    return {type: "CHANGE_TASK_STATUS", payload: {todolistId, taskId, taskStatus}}
}
export const updateTaskAC = (todolistId: string, taskId: string, newTitle: string): updateTaskType => {
    return {type: "UPDATE_TASK", payload: {todolistId, taskId, newTitle}}
}
