// estado de mesa
export type TableStatusT = "disponible" | "ocupada" | "reservada" | "limpieza";

// lista de tablas con paginacion
export interface TablesListRes {
  data: Table[];
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

export interface Table {
  id: string;
  numero_mesa: string;
  piso_id: string;
  estado: TableStatusT;
  reservada_para: string | null;
  orden_actual_id: string | null;
  fecha_creacion: string;
  fecha_actualizacion: string;
  pisos: {
    id: string;
    nombre: string;
    nivel: number;
    esta_activo: boolean;
    fecha_creacion: string;
    fecha_actualizacion: string;
  };
}

// crear tabla response
export interface TableCreateRes {
  id: string;
  numero_mesa: string;
  piso_id: string;
  estado: TableStatusT;
  reservada_para: string | null;
  orden_actual_id: string | null;
  fecha_creacion: string;
  fecha_actualizacion: string;
  pisos: {
    id: string;
    nombre: string;
    nivel: number;
    esta_activo: boolean;
    fecha_creacion: string;
    fecha_actualizacion: string;
  };
}
