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
  table_number: string;
  floor_id: string;
  status: TableStatusT;
  reserved_for: string | null;
  current_order_id: string | null;
  created_at: string;
  updated_at: string;
  floors: {
    id: string;
    name: string;
    level: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
}

// crear tabla response
export interface TableCreateRes {
  id: string;
  table_number: string;
  floor_id: string;
  status: TableStatusT;
  reserved_for: string | null;
  current_order_id: string | null;
  created_at: string;
  updated_at: string;
  floors: {
    id: string;
    name: string;
    level: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
}
