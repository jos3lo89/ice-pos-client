import type { OrderStatusT, TableStatusT } from "@/common/types/order";

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
  current_order: {
    id: string;
    numero_orden: string;
    estado: OrderStatusT;
    total: string;
    fecha_creacion: string;
  }[];
}
