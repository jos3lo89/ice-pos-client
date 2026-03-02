import type {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
} from "../entities/auth.entity";

export interface AuthRepository {
  login(dto: LoginRequest): Promise<LoginResponse>;
  logout(): Promise<LogoutResponse>;
}
