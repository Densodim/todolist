import { Dispatch } from "redux";
import { appAction, RequestStatus } from "app/app-reducer";
import axios from "axios";
import { BaseResponseType } from "common/types/base-response-type";

/**
 * handleServerAppError - function error app
 * @param data
 * @param dispatch - dispatch
 * @param isShowError
 * @return - ничего не возвращает null
 */
export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: Dispatch, isShowError: boolean = true) => {
  if (isShowError) {
    // if (data.messages.length) {
    //   dispatch(appAction.setAppError({ error: data.messages[0] }));
    // } else {
    //   dispatch(appAction.setAppError({ error: "Some error occurred" }));
    // }
    dispatch(appAction.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
  }
  dispatch(appAction.setAppStatus({ status: RequestStatus.FAILED }));
};

// export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
//   dispatch(appAction.setAppError({ error: error.message ? error.message : "Some error occurred" }));
//   dispatch(appAction.setAppStatus({ status: RequestStatus.FAILED }));
// };

export const handleServerNetworkError = (err: unknown, dispatch: Dispatch): void => {
  let errorMessage = "Some error occurred";

  // ❗Проверка на наличие axios ошибки
  if (axios.isAxiosError(err)) {
    // ⏺️ err.response?.data?.message - например получение тасок с невалидной todolistId
    // ⏺️ err?.message - например при создании таски в offline режиме
    errorMessage = err.response?.data?.message || err?.message || errorMessage;
    // ❗ Проверка на наличие нативной ошибки
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`;
    // ❗Какой-то непонятный кейс
  } else {
    errorMessage = JSON.stringify(err);
  }

  dispatch(appAction.setAppError({ error: errorMessage }));
  dispatch(appAction.setAppStatus({ status: RequestStatus.FAILED }));
};
