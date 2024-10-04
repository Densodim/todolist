import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "features/auth/api/auth-api";
import { createAppAsyncThunk } from "../common/utils/create-app-async-thunk";
import { handleServerAppError, handleServerNetworkError } from "../common/utils/error-utils";

export enum RequestStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

let initialState: InitialStateType = {
  status: RequestStatus.IDLE,
  error: null,
  isInitialized: false
};

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatus }>) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    }
  },
  // extraReducers:(builder)=>{
  //   builder
  //     .addCase(initializeApp.fulfilled, (state, action: PayloadAction<{ isInitialized: boolean }>)=>{
  //       state.isInitialized = action.payload.isInitialized;
  //     })
  // },
  selectors: {
    selectorAppError: (sliceState) => sliceState.error,
    selectorAppStatus: (sliceState) => sliceState.status,
    selectorAppInitialized: (sliceState) => sliceState.isInitialized
  }
});

export const appReducer = slice.reducer;
export const appAction = slice.actions;
export const appSelector = slice.selectors;

export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  status: RequestStatus;
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: string | null;
  // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
  isInitialized: boolean;
};

export const initializeApp = createAppAsyncThunk<{
  isLoggedIn: boolean
}, undefined>(`${slice.name}/initializeApp`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true };
    } else {
      handleServerAppError(res.data, dispatch, false);
      return rejectWithValue(null); //кастыль
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null); //кастыль
  } finally {
    dispatch(appAction.setAppInitialized({ isInitialized: true }));
  }

});

