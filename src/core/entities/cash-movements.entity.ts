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
