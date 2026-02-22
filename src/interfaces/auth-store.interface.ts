import type { UserRole } from "@/common/types/roles";

export interface UserState {
  id: string;
  usuario: string;
  nombre_completo: string;
  rol: UserRole;
  esta_activo: boolean;
  telefono: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface AuthState {
  user: UserState | null;
  isAuthenticated: boolean;
  logout: () => void;
  setUser: (user: UserState) => void;
}
