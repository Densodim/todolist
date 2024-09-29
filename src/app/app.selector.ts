import { AppRootStateType } from "app/store";
import { RequestStatus } from "app/app-reducer";

export const isLoadingSelector = (state: AppRootStateType): boolean => {
  return state.auth.isLoggedIn;
};
export const isInitializedSelector = (state: AppRootStateType): boolean => state.app.isInitialized;
export const statusSelector = (state: AppRootStateType): RequestStatus => state.app.status;
