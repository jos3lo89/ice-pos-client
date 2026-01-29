import type { Role } from "@/common/types/roles";

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  full_name: string;
  role: Role;
  is_active: boolean;
  phone: string;
  created_at: string;
  updated_at: string;
}
