export interface ReportResponse {
  sesion: Sesion;
  cajero: Cajero;
  ventas: Ventas;
  arqueo: Arqueo;
  ordenes: Ordenes;
  pagos: Pago[];
  movimientos: Movimiento[];
  totales: Totales;
}

export interface Sesion {
  id: string;
  estado: "abierta" | "cerrada";
  fecha_apertura: string;
  fecha_cierre: string | null;
  notas: string | null;
}

export interface Cajero {
  id: string;
  nombre: string;
  usuario: string;
}

export interface Ventas {
  efectivo: number;
  yape: number;
  plin: number;
  tarjeta: number;
  total: number;
}

export interface Arqueo {
  saldo_apertura: number;
  ventas_efectivo: number;
  ingresos_manuales: number;
  egresos_manuales: number;
  egresos_gastos: number;
  saldo_esperado: number;
  saldo_real: number | null;
  diferencia: number | null;
  esta_cuadrada: boolean | null;
}

export interface Ordenes {
  total: number;
  completadas: number;
  canceladas: number;
  pendientes: number;
}

export interface Pago {
  numero_pago: string;
  orden: string;
  mesa: string;
  mesero: string;
  metodo: "efectivo" | "tarjeta" | "yape" | "plin";
  tipo_documento: "ticket" | "boleta" | "factura";
  monto: number;
  fecha: string;
}

export interface Movimiento {
  tipo: "egreso_gasto" | "ingreso_manual" | "egreso_manual";
  descripcion: string;
  monto: number;
  fecha: string;
}

export interface Totales {
  total_ingresos: number;
  total_egresos: number;
  total_neto: number;
  cantidad_pagos: number;
}
