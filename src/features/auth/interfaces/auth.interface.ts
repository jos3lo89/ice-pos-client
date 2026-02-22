import type { UserRole } from "@/common/types/roles";

export interface LoginRes {
  id: string;
  usuario: string;
  nombre_completo: string;
  rol: UserRole;
  esta_activo: boolean;
  telefono: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface LogoutRes {
  message: string;
}
