import { todolistsAPI, TodolistType } from "features/TodolistsList/api/todolists-api";
import { Dispatch } from "redux";
import { handleServerNetworkError } from "common/utils/error-utils";
import { AppThunk } from "app/store";
import { appAction, RequestStatus } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = [];

const slice = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index != -1) {
        state.splice(index, 1);
      }
      // state.find((todo) => todo.id !== action.payload.id);
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      const newTodolist: TodolistDomainType = {
        ...action.payload.todolist,
        filter: "all",
        entityStatus: RequestStatus.IDLE,
      };
      state.unshift(newTodolist);
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    },
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.filter = action.payload.filter;
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; status: RequestStatus }>) => {
      const index = state.findIndex((index) => index.id === action.payload.id);
      if (index > -1) {
        state[index].entityStatus = action.payload.status;
      }
    },
    setTodolists: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: RequestStatus.IDLE }));
    },
  },
});

export const todolistsReducer = slice.reducer;

// actions
export const todolistsAction = slice.actions;

// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(appAction.setAppStatus({ status: RequestStatus.LOADING }));
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(todolistsAction.setTodolists({ todolists: res.data }));
        dispatch(appAction.setAppStatus({ status: RequestStatus.SUCCEEDED }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(appAction.setAppStatus({ status: RequestStatus.LOADING }));
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(todolistsAction.changeTodolistEntityStatus({ id: todolistId, status: RequestStatus.LOADING }));
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(todolistsAction.removeTodolist({ id: todolistId }));
      //скажем глобально приложению, что асинхронная операция завершена
      dispatch(appAction.setAppStatus({ status: RequestStatus.SUCCEEDED }));
    });
  };
};
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(appAction.setAppStatus({ status: RequestStatus.LOADING }));
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistsAction.addTodolist({ todolist: res.data.data.item }));
      dispatch(appAction.setAppStatus({ status: RequestStatus.SUCCEEDED }));
    });
  };
};
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(todolistsAction.changeTodolistTitle({ id, title }));
    });
  };
};

// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
};
