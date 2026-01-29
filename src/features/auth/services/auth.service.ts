import http from "@/config/axios";
import type { LoginRequest, LoginResponse } from "../interfaces/auth.interface";
import type { ApiResponse } from "@/interfaces/api-response.interface";

export const authService = {
  login: async (values: LoginRequest) => {
    const { data } = await http.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      values,
    );

    return data.data;
  },
};
