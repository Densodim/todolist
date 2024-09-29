import { Dispatch } from "redux";

import { handleServerAppError, handleServerNetworkError } from "common/utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appAction, RequestStatus } from "app/app-reducer";
import { authAPI } from "features/auth/api/auth-api";
import { LoginParamsType } from "features/auth/api/login-params-type";

const initialState: InitialStateType = {
  isLoggedIn: false,
};

// slice - редьюсеры создаем с помощью функции createSlice
const slice = createSlice({
  // важно чтобы не дублировалось, будет в качетве приставки согласно соглашению redux ducks
  name: "auth",
  initialState: initialState,
  // состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (обычный redux)
  reducers: {
    // Объект payload. Типизация через PayloadAction
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      // логику в подредьюсерах пишем мутабельным образом,
      // т.к. иммутабельность достигается благодаря immer.js
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

// Создаем reducer с помощью slice
export const authReducer = slice.reducer;

// actions

// Action creator также достаем с помощью slice
// export const { setIsLoggedIn } = slice.actions;
// либо вот так. ❗Делаем так, в дальнейшем пригодиться
export const authActions = slice.actions;

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(appAction.setAppStatus({ status: RequestStatus.LOADING }));
  authAPI
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
        dispatch(appAction.setAppStatus({ status: RequestStatus.SUCCEEDED }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(appAction.setAppStatus({ status: RequestStatus.LOADING }));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
        dispatch(appAction.setAppStatus({ status: RequestStatus.SUCCEEDED }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

// types

// type ActionsType = ReturnType<typeof authActions>;
type InitialStateType = {
  isLoggedIn: boolean;
};

// type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>;
