import http from "@/config/axios";
import type { LoginRequest, LoginResponse } from "@/interfaces/auth.interface";

export const authService = {
  login: async (values: LoginRequest): Promise<LoginResponse> => {
    const { data } = await http.post("/auth/login", values);
    return data;
  },
};
