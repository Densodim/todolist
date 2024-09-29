import { todolistsAPI, TodolistType } from "features/TodolistsList/api/todolists-api";
import { Dispatch } from "redux";
import { handleServerNetworkError } from "common/utils/error-utils";
import { appAction, RequestStatus } from "app/app-reducer";
import { asyncThunkCreator, buildCreateSlice, PayloadAction } from "@reduxjs/toolkit";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
});

const initialState: Array<TodolistDomainType> = [];

const slice = createAppSlice({
  name: "todolists",
  initialState: initialState,
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{
      rejectValue: null
    }>();
    return {
      removeTodolist: creators.reducer((state, action: PayloadAction<{ id: string }>) => {
        const index = state.findIndex((el) => el.id === action.payload.id);
        if (index != -1) {
          state.splice(index, 1);
        }
      }),
      addTodolist: creators.reducer((state, action: PayloadAction<{ todolist: TodolistType }>) => {
        const newTodolist: TodolistDomainType = {
          ...action.payload.todolist,
          filter: "all",
          entityStatus: RequestStatus.IDLE
        };
        state.unshift(newTodolist);
      }),
      changeTodolistTitle: creators.reducer((state, action: PayloadAction<{ id: string; title: string }>) => {
        const todo = state.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.title = action.payload.title;
        }
      }),
      changeTodolistFilter: creators.reducer((state, action: PayloadAction<{
        id: string;
        filter: FilterValuesType
      }>) => {
        const todo = state.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.filter = action.payload.filter;
        }
      }),
      changeTodolistEntityStatus: creators.reducer((state, action: PayloadAction<{
        id: string;
        status: RequestStatus
      }>) => {
        const index = state.findIndex((index) => index.id === action.payload.id);
        if (index > -1) {
          state[index].entityStatus = action.payload.status;
        }
      }),
      // setTodolists: creators.reducer((state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
      //   return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: RequestStatus.IDLE }));
      // }),
      fetchTodolists: createAThunk<undefined, { todolists: TodolistType[] }>(async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
          dispatch(appAction.setAppStatus({ status: RequestStatus.LOADING }));
          const res = await todolistsAPI.getTodolists();
          dispatch(appAction.setAppStatus({ status: RequestStatus.SUCCEEDED }));
          return { todolists: res.data };

        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      }, {
        fulfilled: (state, action) => {
          return action.payload.todolists.map((tl: any) => ({
            ...tl,
            filter: "all",
            entityStatus: RequestStatus.IDLE
          }));
        }
      })
    };
  }
});

export const todolistsReducer = slice.reducer;

// actions
export const todolistsAction = slice.actions;

// thunks
// export const fetchTodolistsTC = (): AppThunk => {
//   return (dispatch) => {
//     dispatch(appAction.setAppStatus({ status: RequestStatus.LOADING }));
//     todolistsAPI
//       .getTodolists()
//       .then((res) => {
//         dispatch(todolistsAction.setTodolists({ todolists: res.data }));
//         dispatch(appAction.setAppStatus({ status: RequestStatus.SUCCEEDED }));
//       })
//       .catch((error) => {
//         handleServerNetworkError(error, dispatch);
//       });
//   };
// };
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
