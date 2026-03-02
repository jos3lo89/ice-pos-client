// crear movimiento de caja - request
export interface CashMovementsEntity {
  tipo: "ingreso_manual" | "egreso_manual" | "egreso_gasto";
  monto: number;
  descripcion: string | null;
}

// crear movimiento de caja - response
export interface CashMovementsResponse {
  transaccion: {
    id: string;
    tipo: "ingreso_manual" | "egreso_manual" | "egreso_gasto";
    monto: number;
    descripcion: string;
    fecha: string;
  };
  caja: {
    saldo_esperado_anterior: number;
    saldo_esperado_actual: number;
  };
}

// obtener movimientos de caja - response
export interface GetCashMovementsResponse {
  data: CashMovementsData[];
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

export interface CashMovementsData {
  id: string;
  tipo: "ingreso_manual" | "egreso_manual" | "egreso_gasto";
  monto: number;
  descripcion: string;
  fecha_creacion: string;
  usuarios: {
    nombre_completo: string;
  };
}
