import { todolistsAction } from "features/TodolistsList/model/todolists-reducer";
import {
  AddTasksArgsType,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
  UpdateTasksArgsType,
} from "features/TodolistsList/api/todolists-api";

import { handleServerAppError, handleServerNetworkError } from "common/utils/error-utils";
import { appAction, RequestStatus } from "app/app-reducer";
import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { TaskStatuses } from "features/TodolistsList/lib/emun/task-statuses";
import { TaskPriorities } from "features/TodolistsList/lib/emun/task-priorities";

const initialState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todolistsAction.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsAction.removeTodolist, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistsAction.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((el:any) => {
          state[el.id] = [];
        });
      })
      .addCase(fetchTasksTC.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(fetchTasksTC.rejected, (state, action) => {
        // debugger;
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((index) => index.id === action.payload.taskId);
        if (index != -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index != -1) {
          tasks.splice(index, 1);
        }
      });
  },
});

// thunks
export const fetchTasksTC = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  `${slice.name}/fetchTasks`, // 1 - prefix
  // 2 - callback (условно наша старая санка), в которую:
  // Первым параметром мы передаем параметры необходимые для санки
  // (если параметров больше чем один упаковываем их в объект)
  // Вторым параметром thunkAPI, обратившись к которому получим dispatch ...
  async (todolistId: string, thunkAPI) => {
    // 3 - деструктурируем параметры именно так. В дальнейшем пригодится такая запись
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appAction.setAppStatus({ status: RequestStatus.LOADING }));
      const res = await todolistsAPI.getTasks(todolistId);
      // const res = await todolistsAPI.getTasks("dfdfd");
      const tasks = res.data.items;
      dispatch(appAction.setAppStatus({ status: RequestStatus.SUCCEEDED }));
      return { tasks, todolistId };
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null); //кастыль
    }
  },
);

export const addTaskTC = createAppAsyncThunk<{ task: TaskType }, AddTasksArgsType>(
  `${slice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appAction.setAppStatus({ status: RequestStatus.LOADING }));
      const res = await todolistsAPI.createTask(arg);
      if (res.data.resultCode === 0) {
        const task = res.data.data.item;
        dispatch(appAction.setAppStatus({ status: RequestStatus.SUCCEEDED }));
        return { task };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null); //кастыль
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null); //кастыль
    }
  },
);

export const updateTaskTC = createAppAsyncThunk<UpdateTasksArgsType, UpdateTasksArgsType>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    try {
      const state = getState();
      const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);
      if (!task) {
        //throw new Error("task not found in the state");
        console.warn("task not found in the state");
        return rejectWithValue(null); //кастыль
      }
      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...arg.domainModel,
      };
      const res = await todolistsAPI.updateTask(arg.todolistId, arg.taskId, apiModel);
      if (res.data.resultCode === 0) {
        return { taskId: arg.taskId, domainModel: arg.domainModel, todolistId: arg.todolistId };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null); //кастыль
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null); //кастыль
    }
  },
);

export const removeTaskTC = createAppAsyncThunk<
  { taskId: string; todolistId: string },
  { taskId: string; todolistId: string }
>(`${slice.name}/removeTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await todolistsAPI.deleteTask(arg.todolistId, arg.taskId);
    if (res.data.resultCode === 0) {
      return { taskId: arg.taskId, todolistId: arg.todolistId };
    }
    return rejectWithValue(null); //кастыль
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null); //кастыль
  }
});

// actions
export const tasksAction = slice.actions;
export const tasksReducer = slice.reducer;
export const tasksThunks = { fetchTasksTC, addTaskTC };

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
