import {TaskStateType, TodolistType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";

test('ids should be equal todolist', () => {
    const startTaskStatus:TaskStateType = {};
    const startTodolistsState:Array<TodolistType> = [];

    const action = addTodolistAC('new title');

    const endTaskStatus = taskReducer(startTaskStatus, action);
    const endTodolistsStatus = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTaskStatus);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsStatus[0].id;

    expect(idFromTasks).toBe(action.payload.todolistId);
    expect(idFromTodolists).toBe(action.payload.todolistId);
})