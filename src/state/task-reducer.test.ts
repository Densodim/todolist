import {v1} from "uuid";
import {addTaskAC, changeTaskStatus, changeTaskStatusAC, removeTaskAC, taskReducer, updateTaskAC} from "./task-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";
import {TaskStateType} from "../App";

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
    expect(endState[todolistId1].every(el => el.id != startState[todolistId1][0].id)).toBeTruthy();
})
// test('correct task should be deleted from correct array', () => {
//     const startState:TaskStateType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', isDane: false},
//             {id: '2', title: 'JS', isDane: true},
//             {id: '3', title: 'React', isDane: false}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', isDane: false},
//             {id: '2', title: 'milk', isDane: true},
//             {id: '3', title: 'tea', isDane: false}
//         ]
//     }
//
//     const action = removeTaskAC('todolistId2', '2')
//
//     const endState = taskReducer(startState, action)
//
//     expect(endState).toEqual({
//         'todolistId1': [
//             {id: '1', title: 'CSS', isDane: false},
//             {id: '2', title: 'JS', isDane: true},
//             {id: '3', title: 'React', isDane: false}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', isDane: false},
//             {id: '3', title: 'tea', isDane: false}
//         ]
//     })
// })


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
    expect(endState[todolistId1][0].id).toBeDefined();
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

test('new property with new array should be add when new todolist add', () => {
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
    const action = addTodolistAC('new title');
    const endState = taskReducer(taskState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(el => el != todolistId1 && el != todolistId2);
    if (!newKey) {
        throw new Error('new key not found');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistsId should be deleted', () => {
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

    const action = removeTodolistAC(todolistId1);
    const endState = taskReducer(taskState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todolistId1]).not.toBeDefined();
})

