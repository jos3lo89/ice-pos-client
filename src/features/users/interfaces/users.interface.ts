import type { UserRole } from "@/common/types/roles";

// obtener todos los usuarios
export interface User {
  id: string;
  usuario: string;
  nombre_completo: string;
  rol: UserRole;
  esta_activo: boolean;
  telefono: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
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
  usuario: string;
  nombre_completo: string;
  rol: UserRole;
  esta_activo: boolean;
  telefono: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// cambio de estado request
export interface ChangeUserStateReq {
  payload: {
    is_active: boolean;
  };
  userId: string;
}

// cambio de estado response
export interface UserChangeStateRes {
  id: string;
  usuario: string;
  nombre_completo: string;
  rol: UserRole;
  esta_activo: boolean;
  telefono: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// get profile
export interface GetProfileRes {
  id: string;
  usuario: string;
  nombre_completo: string;
  rol: UserRole;
  esta_activo: boolean;
  telefono: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}
