import http from "@/config/axios";
import type { AuthRepository } from "@/core/repositories/auth.repository";
import type {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
} from "@/core/entities/auth.entity";

class AuthApi implements AuthRepository {
  async login(values: LoginRequest): Promise<LoginResponse> {
    const { data } = await http.post("/auth/login", values);
    return data;
  }

  async logout(): Promise<LogoutResponse> {
    const { data } = await http.post("/auth/logout");
    return data;
  }
}

export const authApi = new AuthApi();
