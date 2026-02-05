import http from "@/config/axios";
import type { LoginRes } from "../interfaces/auth.interface";
import type { LoginT } from "../schemas/auth.schema";

export const authService = {
  login: async (values: LoginT) => {
    const { data } = await http.post<LoginRes>("/auth/login", values);
    return data;
  },
};
