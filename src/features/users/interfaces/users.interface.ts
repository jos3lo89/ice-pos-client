import type { UserRole } from "@/common/types/roles";

// obtener todos los usuarios
export interface User {
  id: string;
  username: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface GetAllUsersRes {
  data: User[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

// crear usuario
export interface CreateUserRes {
  id: string;
  username: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserChangeStateReq {
  is_active: boolean;
}

export interface UserChangeStateRes {
  id: string;
  username: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  phone: string;
  created_at: string;
  updated_at: string;
}
