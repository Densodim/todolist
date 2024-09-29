import { todolistsAPI, TodolistType } from "features/TodolistsList/api/todolists-api";
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
      // changeTodolistTitle: creators.reducer((state, action: PayloadAction<{ id: string; title: string }>) => {
      //   const todo = state.find((todo) => todo.id === action.payload.id);
      //   if (todo) {
      //     todo.title = action.payload.title;
      //   }
      // }),
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
      }),
      removeTodolist: createAThunk<{ id: string }, { id: string }>(async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
          //изменим глобальный статус приложения, чтобы вверху полоса побежала
          dispatch(appAction.setAppStatus({ status: RequestStatus.LOADING }));
          //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
          dispatch(todolistsAction.changeTodolistEntityStatus({ id: arg.id, status: RequestStatus.LOADING }));
          const res = await todolistsAPI.deleteTodolist(arg.id);
          dispatch(appAction.setAppStatus({ status: RequestStatus.SUCCEEDED }));
          return { id: arg.id };
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      }, {
        fulfilled: (state, action: PayloadAction<{ id: string }>) => {
          const index = state.findIndex((el) => el.id === action.payload.id);
          if (index != -1) {
            state.splice(index, 1);
          }
        }
      }),
      addTodolist: createAThunk<{ title: string }, { todolist: TodolistType }>(async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
          dispatch(appAction.setAppStatus({ status: RequestStatus.LOADING }));
          const res = await todolistsAPI.createTodolist(arg.title);
          dispatch(appAction.setAppStatus({ status: RequestStatus.SUCCEEDED }));
          return { todolist: res.data.data.item };
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      }, {
        fulfilled: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
          const newTodolist: TodolistDomainType = {
            ...action.payload.todolist,
            filter: "all",
            entityStatus: RequestStatus.IDLE
          };
          state.unshift(newTodolist);
        }
      }),
      changeTodolistTitle: createAThunk<{ id: string; title: string }, { id: string; title: string }>(async ({ id, title }, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
          await todolistsAPI.updateTodolist(id, title);
          return { id, title };
        } catch (error) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      }, {
        fulfilled: (state, action: PayloadAction<{ id: string; title: string }>) => {
          const todo = state.find((todo) => todo.id === action.payload.id);
          if (todo) {
            todo.title = action.payload.title;
          }
        }
      })
    };
  }
});

export const todolistsReducer = slice.reducer;

// actions
export const todolistsAction = slice.actions;

// thunks

// export const changeTodolistTitleTC = (id: string, title: string) => {
//   return (dispatch: Dispatch) => {
//     todolistsAPI.updateTodolist(id, title).then((res) => {
//       dispatch(todolistsAction.changeTodolistTitle({ id, title }));
//     });
//   };
// };

// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
};
