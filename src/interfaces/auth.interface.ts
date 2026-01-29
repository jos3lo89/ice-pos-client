import type { RoleType } from "@/enums/roles.enum";

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  pin: string;
  full_name: string;
  role: RoleType;
  is_active: boolean;
  phone: string;
  created_at: string;
  updated_at: string;
}
