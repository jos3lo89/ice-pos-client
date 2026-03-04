// query de sesiones de caja historial por usuario
export interface CashSessionHistorDto {
  user_id: string;
  meta: {
    page: number;
    limit: number;
  };
}

// sesiones de caja historial por usuario
export interface CashSessionRes {
  data: CashSessionData[];
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

export interface CashSessionData {
  id: string;
  cajero_id: string;
  saldo_apertura: string;
  saldo_esperado: string;
  saldo_real: string;
  diferencia: string;
  total_yape: string;
  total_plin: string;
  total_tarjeta: string;
  estado: "abierta" | "cerrada";
  notas: string | null;
  fecha_apertura: string;
  fecha_cierre: string | null;
  usuarios: {
    id: string;
    nombre_completo: string;
  };
}

// ==============
// query de ordernes por session de caja
export interface CashSessionOrdersDto {
  sessionId: string;
  meta: {
    page: number;
    limit: number;
    search?: string;
  };
}
// historial de ordernes por session de caja
export interface CashSessionOrdersRes {
  data: CashSessionOrdersData[];
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

export interface CashSessionOrdersData {
  id: string;
  numero_orden: string;
  estado:
    | "pendiente"
    | "preparando"
    | "listo"
    | "servido"
    | "completado"
    | "cancelado";
  tipo_orden: "en_local" | "para_llevar";
  mesa: string;
  mesero: string;
  total_items: number;
  total: number;
  monto_pagado: number;
  pendiente: number;
  esta_pagado_completo: boolean;
  fecha_creacion: string;
  fecha_completado: string | null;
  pagos: {
    id: string;
    numero_pago: string;
    monto: number;
    metodo: "efectivo" | "tarjeta" | "yape" | "plin";
    tipo_documento: "ticket" | "boleta" | "factura";
    fecha: string;
  }[];
}
