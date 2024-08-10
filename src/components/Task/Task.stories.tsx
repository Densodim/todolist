import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {Task} from "./Task";
import {useState} from "react";

import {action} from '@storybook/addon-actions'
import {render} from "react-dom";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes

    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args

};
export default meta;

type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskStory = {
    args: {
        changeTaskStatus: fn(),
        changeTaskTitle: fn(),
        removeTask: fn(),
        task: {id: 'dsdfsdfsdf', isDone: false, title: 'fsdfdsdf'},
        todolistId: 'ffdsdsfd'
    }
};

const ToggleTask = () => {
    const [task, setTask] = useState({id: 'dsdfsdfsdf', isDone: false, title: 'React'});

    function changeTaskStatus() {
        setTask({...task, isDone: !task.isDone})
    }

    function changeTaskTitle(taskId: string, newTitle: string) {
        setTask({...task, title: newTitle})
    }

    return <Task changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle} removeTask={action('removeTask')}
                 task={task} todolistId={'ffdsdsfd'}/>
}

export const ToogleTaskStory:Story = {
    render: () => <ToggleTask/>
}


