import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";



// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    addItem:{
      description: 'Button clicked inside form'
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { addItem: fn() },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStory: Story = {

};

export const AddItemFormError = React.memo( (props: AddItemFormPropsType) => {

  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>('Title is required')

  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItem();
    }
  }

  return <div>
      <TextField variant="outlined"
  error={!!error}
  value={title}
  onChange={onChangeHandler}
  onKeyPress={onKeyPressHandler}
  label="Title"
  helperText={error}
  />
  <IconButton color="primary" onClick={addItem}>
      <AddBox />
      </IconButton>
      </div>
} );

export const AddItemFormErrorStory:Story = {
  render: (args)=><AddItemFormError addItem={args.addItem}/>
}
