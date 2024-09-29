import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, AppRootStateType } from "app/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatch;
  rejectValue: null;
}>();

//  1. То, что возвращает Thunk
// { tasks: TaskType[]; todolistId: string },
//  2. ThunkArg - аргументы санки (тип, который санка принимает)
// string,
//    3. AsyncThunkConfig. Какие есть поля смотрим в доке.
//    rejectValue - Используем для типизации возвращаемой ошибки
//    state - используем для типизации App. Когда используем getState
//   { rejectValue: unknown }
