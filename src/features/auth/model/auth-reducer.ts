import { handleServerAppError, handleServerNetworkError } from "common/utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appAction, RequestStatus } from "app/app-reducer";
import { authAPI } from "features/auth/api/auth-api";
import { LoginParamsType } from "features/auth/api/login-params-type";
import { createAppAsyncThunk } from "../../../common/utils/create-app-async-thunk";
import { thunkTryCatch } from "../../../common/utils/thunkTryCatch";

const initialState: InitialStateType = {
  isLoggedIn: false
};

// slice - редьюсеры создаем с помощью функции createSlice
const slice = createSlice({
  // важно чтобы не дублировалось, будет в качетве приставки согласно соглашению redux ducks
  name: "auth",
  initialState: initialState,
  // состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (обычный redux)
  reducers: {
    // Объект payload. Типизация через PayloadAction
    // setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
    //   логику в подредьюсерах пишем мутабельным образом,
    // т.к. иммутабельность достигается благодаря immer.js
    // state.isLoggedIn = action.payload.isLoggedIn;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  }
});

// Создаем reducer с помощью slice
export const authReducer = slice.reducer;
// export const authThunks = {login};

// actions

// Action creator также достаем с помощью slice
// export const { setIsLoggedIn } = slice.actions;
// либо вот так. ❗Делаем так, в дальнейшем пригодиться
// export const authActions = slice.actions;

// thunks
export const login = createAppAsyncThunk<{
  isLoggedIn: boolean
}, LoginParamsType>(`${slice.name}/login`, (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.login(arg);
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true };
    } else {
      const isShowAppError = !res.data.fieldsErrors.length;
      handleServerAppError(res.data, dispatch, isShowAppError);
      return rejectWithValue(res.data); //кастыль
    }
  });

});
export const logout = createAppAsyncThunk<{
  isLoggedIn: boolean
}, undefined>(`${slice.name}/logout`, (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.logout();
    if (res.data.resultCode === 0) {
      return { isLoggedIn: false };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null); //кастыль
    }
  });
});


// types

type InitialStateType = {
  isLoggedIn: boolean;
};

