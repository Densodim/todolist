import React, {useState} from 'react'
import type {Meta, StoryObj} from "@storybook/react";
import {TasksAPI, TasksType} from "./tasks-api";


const meta: Meta<TasksType> = {
    title: 'API/tasks',
    // component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes

};

export default meta;
type Story = StoryObj<TasksType>;


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('');
    const handlerGetTodolist = () => {
        TasksAPI.getTasks(todolistId).then((res) => {
            setState(res.data);
        })
    }
    return <div>
        <div>
            <input placeholder={'ID totolist'} value={todolistId}
                   onChange={(event) => setTodolistId(event.currentTarget.value)}/>
            <button onClick={handlerGetTodolist}>Get Task</button>
        </div>
        {state ? JSON.stringify(state) : 'Loading...'}</div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('');
    const [todolistId, setTodolistId] = useState<any>('');


    const handlerCreateNewTask = () => {
        TasksAPI.createTasks(todolistId, title).then((res) => {
            setState(res.data);
        })
    }
    return <div>
        <div>
            <input placeholder={'ID totolist'} value={todolistId}
                   onChange={(event) => setTodolistId(event.currentTarget.value)}/>
            <input placeholder={'Title'} value={title}
                   onChange={(event) => setTitle(event.currentTarget.value)}/>
            <button onClick={handlerCreateNewTask}>Create Task</button>
        </div>
        {state ? JSON.stringify(state) : 'Loading...'}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>('');
    const [todolistId, setTodolistId] = useState<any>('');

    const handlerDeleteNewTask = () => {
        TasksAPI.deleteTasks(todolistId, taskId).then((res) => {
            setState(res.data);
        })
    }
    return <div>
        <div>
            <input placeholder={'ID totolist'} value={todolistId}
                   onChange={(event) => setTodolistId(event.currentTarget.value)}/>
            <input placeholder={'ID Task'} value={taskId}
                   onChange={(event) => setTaskId(event.currentTarget.value)}/>
            <button onClick={handlerDeleteNewTask}>Delete Task</button>
        </div>
        {state ? JSON.stringify(state) : 'Loading...'}</div>
}

export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    const [task, setTask] = useState<any>(null);
    const [title, setTitle] = useState<any>('');
    const [todolistId, setTodolistId] = useState<any>('');
    const [taskId, setTaskId] = useState<any>('');

    const handlerUpdateTask = () => {
        const model = {
            ...task,
            title,
        }
        TasksAPI.getTasks(todolistId).then((res) => setTask(res.data));
        TasksAPI.updateTasks(todolistId, taskId, model).then((res) => {
            setState(res.data);
        })
    }
    return <div>
        <div>
            <input placeholder={'ID totolist'} value={todolistId}
                   onChange={(event) => setTodolistId(event.currentTarget.value)}/>
            <input placeholder={'ID Task'} value={taskId}
                   onChange={(event) => setTaskId(event.currentTarget.value)}/>
            <input placeholder={'Title'} value={title}
                   onChange={(event) => setTitle(event.currentTarget.value)}/>
            <button onClick={handlerUpdateTask}>Update Task</button>
        </div>
        {state ? JSON.stringify(state) : 'Loading...'}</div>
}