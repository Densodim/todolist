import { Dispatch } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authActions } from "features/auth/model/auth-reducer";
import { authAPI } from "features/auth/api/auth-api";

export enum RequestStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

let initialState: InitialStateType = {
  status: RequestStatus.IDLE,
  error: null,
  isInitialized: false,
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
    },
  },
  selectors: {
    selectorAppError: (sliceState) => sliceState.error,
    selectorAppStatus: (sliceState) => sliceState.status,
    selectorAppInitialized: (sliceState) => sliceState.isInitialized,
  },
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

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
    } else {
    }

    dispatch(appAction.setAppInitialized({ isInitialized: true }));
  });
};
