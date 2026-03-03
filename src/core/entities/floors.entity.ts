import type { TableStatusT } from "./table.entity";

// create piso response
export interface CreateFloorRes {
  id: string;
  nombre: string;
  nivel: number;
  esta_activo: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// get pisos
export interface GetFloorsRes {
  data: Piso[];
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

export interface Piso {
  id: string;
  nombre: string;
  nivel: number;
  esta_activo: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
  _count: {
    mesas: number;
  };
}

// get all pisos response
export interface GetAllFloorsRes {
  id: string;
  nivel: number;
}

// get all pisos with tables response
export interface GetAllFloorsWithTablesRes {
  id: string;
  nivel: number;
  nombre: string;
  mesas: Mesa[];
}

export interface Mesa {
  id: string;
  estado: TableStatusT;
  numero_mesa: string;
  orden_actual_id: string | null;
  orden_actual: {
    id: string;
    numero_orden: string;
    estado: string;
    total: string;
    fecha_creacion: string;
    usuarios: {
      id: string;
      nombre_completo: string;
    };
  } | null;
}

// create piso request
export interface CreateFloorI {
  nombre: string;
  nivel: number;
}
