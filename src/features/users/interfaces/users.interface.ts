import type { Role } from "@/common/types/roles";

export interface UsersResponse {
  id: number;
  username: string;
  full_name: string;
  role: Role;
  is_active: boolean;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateUserResponse {
  id: number;
  username: string;
  full_name: string;
  role: Role;
  is_active: boolean;
  phone: string | null;
  created_at: string;
  updated_at: string;
}
