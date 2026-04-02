// obtener pagos de la sesion
export interface GetSessionPaymentsRes {
  data: PaymentSession[];
  meta: Meta;
}

export interface PaymentSession {
  id: string;
  numero_pago: string;
  monto: string;
  monto_recibido?: string;
  vuelto?: string;
  metodo: "efectivo" | "tarjeta" | "yape" | "plin";
  tipo_documento: "ticket" | "boleta" | "factura";
  fecha_creacion: string;
  ordenes: Ordenes;
}

export interface Ordenes {
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
  total: string;
  monto_pagado: string;
  fecha_creacion: string;
  fecha_completado: string;
  mesa_historial?: MesaHistorial;
  usuarios: Usuarios;
  _count: Count;
}

export interface MesaHistorial {
  numero_mesa: string;
}

export interface Usuarios {
  nombre_completo: string;
}

export interface Count {
  items_orden: number;
}

export interface Meta {
  total: number;
  page: number;
  lastPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage: number | null;
  prevPage: number | null;
}
