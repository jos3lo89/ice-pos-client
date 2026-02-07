import http from "@/config/axios";
import type { LoginRes } from "../interfaces/auth.interface";
import type { LoginT } from "../schemas/auth.schema";

class AuthService {
  async login(values: LoginT) {
    const { data } = await http.post<LoginRes>("/auth/login", values);
    return data;
  }
}

export const authService = new AuthService();
