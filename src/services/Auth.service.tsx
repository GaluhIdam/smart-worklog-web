import type { CommonResponse } from "../common/response/CommonResponse";
import { httpService } from "../common/http/HttpService";
import type { LoginRequest } from "../data/request/Login/Login.request";
import type { LoginResponse } from "../data/response/Login/LoginResponse";
import type { UserResponse } from "../data/response/User/UserResponse";

export class AuthService {
  async login(request: LoginRequest): Promise<CommonResponse<LoginResponse>> {
    return httpService.post<CommonResponse<LoginResponse>>("/auth/login", request);
  }

  async user(): Promise<CommonResponse<UserResponse>> {
    return httpService.get<CommonResponse<UserResponse>>("/auth/user");
  }

  async logout(): Promise<void> {
    await httpService.post<void>("/auth/logout");
  }
}

export const authService = new AuthService();
