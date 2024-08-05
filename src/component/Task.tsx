import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, ListItem} from "@mui/material";
import {getListItemSx} from "./Todolist.styles";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import {changeTaskStatusAC, removeTaskAC, updateTaskAC} from "../state/task-reducer";
import {AppRootState} from "../state/store";
import {TaskStateType} from "../AppWithRedux";

type TaskPropsType = {
    taskId: string
    todolistId: string
}
export const Task = memo(({taskId, todolistId}: TaskPropsType) => {

    const tasks = useSelector<AppRootState, TaskStateType>((state) => state.tasks);
    const task = tasks[todolistId].filter(el => el.id === taskId)[0];
    const dispatch = useDispatch();

    const handleRemoveTask = useCallback(() => {
        dispatch(removeTaskAC(todolistId, task.id))
    }, [dispatch]);

    const handlerChangeTaskStatus = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newTaskStatus = event.currentTarget.checked;
        dispatch(changeTaskStatusAC(todolistId, task.id, newTaskStatus))
    }, [dispatch]);

    const editaBlueSpan = useCallback((newTitle: string) => {
        dispatch(updateTaskAC(todolistId, task.id, newTitle))
    }, [dispatch]);
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