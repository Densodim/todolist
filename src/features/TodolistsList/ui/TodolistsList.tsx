import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { FilterValuesType, todolistsAction } from "features/TodolistsList/model/todolists-reducer";
import { addTaskTC, removeTaskTC, updateTaskTC } from "features/TodolistsList/model/tasks-reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Todolist } from "features/TodolistsList/ui/Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { isLoadingSelector } from "app/app.selector";
import { tasksSelector, todolistsSelector } from "features/TodolistsList/model/todolists.selector";
import { TaskStatuses } from "features/TodolistsList/lib/emun/task-statuses";

type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector(todolistsSelector);
  const tasks = useSelector(tasksSelector);
  const isLoggedIn = useSelector(isLoadingSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    const thunk = todolistsAction.fetchTodolists();
    dispatch(thunk);
  }, []);

  const removeTask = useCallback(function(taskId: string, todolistId: string) {
    dispatch(removeTaskTC({ taskId, todolistId }));
  }, []);

  const addTask = useCallback(function(title: string, todolistId: string) {
    const thunk = addTaskTC({ title, todolistId });
    dispatch(thunk);
  }, []);

  const changeStatus = useCallback(function(taskId: string, status: TaskStatuses, todolistId: string) {
    dispatch(updateTaskTC({ taskId, domainModel: { status }, todolistId }));
  }, []);

  const changeTaskTitle = useCallback(function(taskId: string, title: string, todolistId: string) {
    dispatch(updateTaskTC({ taskId, domainModel: { title }, todolistId }));
  }, []);

  const changeFilter = useCallback(function(value: FilterValuesType, todolistId: string) {
    const action = todolistsAction.changeTodolistFilter({ id: todolistId, filter: value });
    dispatch(action);
  }, []);

  const removeTodolist = useCallback(function(id: string) {
    const thunk = todolistsAction.removeTodolist({ id });
    dispatch(thunk);
  }, []);

  const changeTodolistTitle = useCallback(function(id: string, title: string) {
    dispatch(todolistsAction.changeTodolistTitle({ id, title }));
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(todolistsAction.addTodolist({ title }));
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
