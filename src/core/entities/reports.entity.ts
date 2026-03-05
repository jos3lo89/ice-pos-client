// Reporte por sesion
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

// Reporte de ranking de productos

// query
export interface RankingProductsQuery {
  fecha_inicio: string;
  fecha_fin: string;
}

// responde
export interface RankingProductsResponse {
  fecha_inicio: string;
  fecha_fin: string;
  total_productos: number;
  ranking: Ranking[];
}

export interface Ranking {
  posicion: number;
  producto_id: string;
  nombre: string;
  categoria: string;
  cantidad_vendida: number;
  total_recaudado: number;
  numero_ordenes: number;
}

// ventas por dia
// query
export interface VentasPorDiaQuery {
  fecha: string;
}

// response
export interface VentasPorDiaResponse {
  fecha: string;
  resumen: ResumenVentasPorDia;
  comparativa_ayer: ComparativaAyer;
  ventas_por_metodo: VentasPorMetodo;
  ventas_por_tipo_orden: VentasPorTipoOrden[];
  movimientos_manuales: MovimientosManuales;
}

export interface ResumenVentasPorDia {
  total_ventas: number;
  total_ordenes: number;
  ordenes_completadas: number;
  ordenes_canceladas: number;
  ordenes_pendientes: number;
  ticket_promedio: number;
}

export interface ComparativaAyer {
  total_ventas_ayer: number;
  variacion_porcentaje: number;
}

export interface VentasPorMetodo {
  efectivo: number;
  yape: number;
  plin: number;
  tarjeta: number;
}

export interface VentasPorTipoOrden {
  tipo: "en_local" | "para_llevar";
  cantidad: number;
  total: number;
}

export interface MovimientosManuales {
  ingresos: number;
  egresos: number;
  gastos: number;
}

// ventas por semana
// query
export interface VentasPorSemanaQuery {
  semana: string;
}

// response
export interface VentasPorSemanaResponse {
  semana: string;
  fecha_inicio: string;
  fecha_fin: string;
  resumen: {
    total_ventas: number;
    total_ordenes: number;
    ordenes_completadas: number;
    ordenes_canceladas: number;
    ticket_promedio: number;
  };

  comparativa_semana_anterior: {
    total_ventas_anterior: number;
    variacion_porcentaje: number | null;
  };

  ventas_por_metodo: {
    efectivo: number;
    yape: number;
    plin: number;
    tarjeta: number;
  };

  mejor_dia: {
    nombre: string;
    total: number;
  };

  desglose_por_dia: {
    dia: string;
    fecha: string;
    total_ventas: number;
    total_ordenes: number;
    ordenes_completadas: number;
    ordenes_canceladas: number;
    ticket_promedio: number;
  }[];
}
