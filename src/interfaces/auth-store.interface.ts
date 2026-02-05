import type { UserRole } from "@/common/types/roles";

export interface UserState {
  id: string;
  username: string;
  full_name: string;
  role: UserRole;
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
