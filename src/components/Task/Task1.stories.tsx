import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import AppWithRedux from "../AppWithRedux/AppWithRedux";
import {Provider, useSelector} from "react-redux";
import {AppRootStateType, store} from "../../state/store";
import {ReduxStoreProviderDecorator} from "../../state/ReduxStoreProviderDecorator";
import {Task1} from "./Task1";
import {TaskType} from "../Todolist/Todolist";
import {v1} from "uuid";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task1> = {
    title: 'Todolist/Task1',
    component: Task1,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Task1>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

const Task = () => {
    let task = useSelector<AppRootStateType, TaskType>((state) => state.tasks["todolistId2"][0])
    if(!task)  task = {id: v1(), title: "DEFAULT TASK", isDone: false}
    return <Task1 task={task} todolistId={"todolistId2"}/>


}

export const Task1Story: Story = {
    render: () => <Task/>
}
