import {v1} from "uuid";
import {TodolistType} from "../App";
import {addTaskAC, changeTaskStatus, changeTaskStatusAC, removeTaskAC, taskReducer, updateTaskAC} from "./task-reducer";

test('remove task from state', () => {
//     data
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDane: true},
            {id: v1(), title: 'JS', isDane: true},
            {id: v1(), title: 'ReactJS', isDane: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDane: true},
            {id: v1(), title: 'GraphQL', isDane: false},
        ]
    }
//     action
    const action = removeTaskAC(todolistId1, startState[todolistId1][0].id)
    const endState = taskReducer(startState, action)
//     expect
    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1].every(el=>el.id != startState[todolistId1][0].id)).toBeTruthy();
})

test('add task from state', () => {
//     data
    let todolistId1 = v1()
    let todolistId2 = v1()

    const taskState = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDane: true},
            {id: v1(), title: 'JS', isDane: true},
            {id: v1(), title: 'ReactJS', isDane: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDane: true},
            {id: v1(), title: 'GraphQL', isDane: false},
        ]
    }
//     action
    const endState: any = taskReducer(taskState, addTaskAC('New task', todolistId1));
//     expect
    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1][0].title).toBe('New task')
});

test('change task status from state', () => {
//     data
    let todolistId1 = v1()
    let todolistId2 = v1()

    const taskState = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDane: true},
            {id: v1(), title: 'JS', isDane: true},
            {id: v1(), title: 'ReactJS', isDane: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDane: true},
            {id: v1(), title: 'GraphQL', isDane: false},
        ]
    }
//     action
    const action: changeTaskStatus = changeTaskStatusAC(todolistId1, taskState[todolistId1][1].id, false)
    const endState = taskReducer(taskState, action);
//     expect
    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1][1].isDane).toBe(false);
});

test('update task from state', () => {
//     data
    let todolistId1 = v1()
    let todolistId2 = v1()

    const taskState = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDane: true},
            {id: v1(), title: 'JS', isDane: true},
            {id: v1(), title: 'ReactJS', isDane: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDane: true},
            {id: v1(), title: 'GraphQL', isDane: false},
        ]
    }
//     action
//     const action = {
//         type: 'UPDATE_TASK' as const,
//         payload: {
//             todolistId: todolistId1,
//             taskId: taskState[todolistId1][0].id,
//             newTitle: 'reducer',
//         }
//     }
    const action = updateTaskAC(todolistId1, taskState[todolistId1][0].id, 'reducer');
    const endState = taskReducer(taskState, action);
//     expect
    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1][0].title).toBe('reducer');
});

