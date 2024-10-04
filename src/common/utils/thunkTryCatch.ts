import { appAction, RequestStatus } from "../../app/app-reducer";
import { handleServerNetworkError } from "./error-utils";
import { AppDispatch, AppRootStateType } from "../../app/store";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { BaseResponseType } from "../types/base-response-type";

type ThunkIpiType = BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>

export const thunkTryCatch = async <T>(thunkAPI: ThunkIpiType, logic: () => Promise<T>): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {

  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appAction.setAppStatus({ status: RequestStatus.LOADING }));
    return await logic();
    // const res = await authAPI.login(arg);
    // if (res.data.resultCode === 0) {
    //   dispatch(appAction.setAppStatus({ status: RequestStatus.SUCCEEDED }));
    //   return { isLoggedIn: true };
    // } else {
    //   const isShowAppError = !res.data.fieldsErrors.length;
    //   handleServerAppError(res.data, dispatch, isShowAppError);
    //   return rejectWithValue(res.data); //кастыль
    // }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null); //кастыль
  } finally {
    dispatch(appAction.setAppStatus({ status: RequestStatus.SUCCEEDED }));
  }

};