import Checkbox from '@mui/material/Checkbox/Checkbox'
import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from '../EditableSpan/EditableSpan'
import {TaskType} from '../Todolist/Todolist'
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task1 = React.memo(({task, todolistId}: TaskPropsType) => {
    const {id, isDone, title} = task
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(id, todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(id, newIsDoneValue, todolistId))
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistId))
    }, [id, todolistId]);


    return <div key={id} className={isDone ? 'is-done' : ''}>
        <Checkbox
            checked={isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})