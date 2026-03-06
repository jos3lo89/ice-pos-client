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
  meta: {
    total: number;
    page: number;
    lastPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
  ranking: Ranking[];
}

export interface Ranking {
  posicion: number;
  producto_id: string;
  nombre: string;
  categoria: string;
  cantidad_vendida: number;
  numero_ordenes: number;
}

// ventas por dia
// query
export interface VentasPorDiaQuery {
  fecha_inicio: string;
  fecha_fin: string;
}

// response
export interface VentasPorDiaResponse {
  fecha: {
    inicio: string;
    fin: string;
  };
  resumen: ResumenDia;
  ventas_por_metodo: VentasPorMetodoDia;
  ventas_por_tipo_orden: VentasPorTipoOrdenDia[];
  movimientos_manuales: MovimientosManualesDia;
}

export interface ResumenDia {
  total_ventas: number;
  total_ordenes: number;
  ordenes_completadas: number;
  ordenes_canceladas: number;
  ordenes_pendientes: number;
}

export interface VentasPorMetodoDia {
  efectivo: number;
  yape: number;
  plin: number;
  tarjeta: number;
}

export interface VentasPorTipoOrdenDia {
  tipo: "en_local" | "para_llevar";
  cantidad: number;
  total: number;
}

export interface MovimientosManualesDia {
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

// ventas por mes
// queyr
export interface VentasPorMesQuery {
  mes: string;
}
// reponse
export interface VentasPorMesResponse {
  mes: string;
  fecha_inicio: string;
  fecha_fin: string;
  resumen: ResumenVentasPorMes;
  comparativa_mes_anterior: ComparativaMesAnterior;
  ventas_por_metodo: VentasPorMetodoMes;
  mejor_dia: MejorDiaMes;
  desglose_por_semana: DesglosePorSemanaMes[];
  desglose_por_dia: DesglosePorDiaMes[];
}

export interface ResumenVentasPorMes {
  total_ventas: number;
  total_ordenes: number;
  ordenes_completadas: number;
  ordenes_canceladas: number;
  ticket_promedio: number;
}

export interface ComparativaMesAnterior {
  total_ventas_anterior: number;
  variacion_porcentaje: number | null;
}

export interface VentasPorMetodoMes {
  efectivo: number;
  yape: number;
  plin: number;
  tarjeta: number;
}

export interface MejorDiaMes {
  dia: number;
  fecha: string;
  total: number;
}

export interface DesglosePorSemanaMes {
  semana: number;
  total_ventas: number;
  total_ordenes: number;
  ordenes_completadas: number;
}

export interface DesglosePorDiaMes {
  dia: number;
  fecha: string;
  total_ventas: number;
  total_ordenes: number;
  ordenes_completadas: number;
}

// historial de sesiones
// query
export interface HistorialSesionesQuery {
  fecha_inicio: string;
  fecha_fin: string;
}

// response
export interface HistorialSesionesResponse {
  fecha_inicio: string;
  fecha_fin: string;
  total_sesiones: number;
  sesiones: Sesione[];
}

export interface Sesione {
  id: string;
  cajero_nombre: string;
  cajero_usuario: string;
  estado: "abierta" | "cerrada";
  fecha_apertura: string;
  fecha_cierre: string | null;
  saldo_apertura: number;
  saldo_esperado: number;
  saldo_real: number | null;
  diferencia: number | null;
  esta_cuadrada: boolean | null;
  total_ventas: number;
  total_ordenes: number;
}
