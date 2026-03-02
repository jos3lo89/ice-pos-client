import type { UserRole } from "@/common/types/roles";

// login - request
export interface LoginRequest {
  userName: string;
  password: string;
}

// login - response
export interface LoginResponse {
  id: string;
  usuario: string;
  nombre_completo: string;
  rol: UserRole;
  esta_activo: boolean;
  telefono: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// logout - response
export interface LogoutResponse {
  message: string;
}
