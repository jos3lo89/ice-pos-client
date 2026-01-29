import type { Role } from "@/types/roles";

export interface UserState {
  id: number;
  username: string;
  pin: string;
  full_name: string;
  role: Role;
  is_active: boolean;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: UserState | null;
  isAuthenticated: boolean;
  logout: () => void;
  setUser: (user: UserState) => void;
}
