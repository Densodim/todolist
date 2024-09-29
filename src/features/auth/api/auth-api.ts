import { instance } from "app/instance/instance";
import { LoginParamsType } from "features/auth/api/login-params-type";
import { BaseResponseType } from "common/types/base-response-type";

export const authAPI = {
  login(data: LoginParamsType) {
    const promise = instance.post<BaseResponseType<{ userId?: number }>>("auth/login", data);
    return promise;
  },
  logout() {
    const promise = instance.delete<BaseResponseType<{ userId?: number }>>("auth/login");
    return promise;
  },
  me() {
    const promise = instance.get<BaseResponseType<{ id: number; email: string; login: string }>>("auth/me");
    return promise;
  },
};
