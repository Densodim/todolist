import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, ListItem} from "@mui/material";
import {getListItemSx} from "./Todolist.styles";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    updateTask: (newTitle: string, taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = memo(({removeTask, updateTask, changeTaskStatus, task, todolistId}: TaskPropsType) => {
    const handleRemoveTask = useCallback(() => {
        removeTask(task.id, todolistId);
    }, []);

    const handlerChangeTaskStatus = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newTaskStatus = event.currentTarget.checked;
        changeTaskStatus(task.id, newTaskStatus, todolistId);
    }, []);

    const editaBlueSpan = useCallback((newTitle: string) => {
        updateTask(newTitle, task.id, todolistId)
    }, []);
    return (
        <ListItem
            key={task.id}
            disableGutters
            disablePadding
            sx={getListItemSx(task.isDane)}
        >
            <div>
                <Checkbox checked={task.isDane} onChange={handlerChangeTaskStatus}/>
                <EditableSpan value={task.title} editaBlueSpan={editaBlueSpan}/>
            </div>
            <IconButton onClick={handleRemoveTask}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
})