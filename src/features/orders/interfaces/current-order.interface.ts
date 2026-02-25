// current order response
export type OrderStatus =
  | "pendiente"
  | "preparando"
  | "listo"
  | "servido"
  | "completado"
  | "cancelado";

export type OrderType = "en_local" | "para_llevar";

export type OrderItemStatus =
  | "pendiente"
  | "preparando"
  | "listo"
  | "cancelado";

export interface CurrentOrderRes {
  id: string;
  numero_orden: string;
  mesa_id: string;
  mesero_id: string;
  estado: OrderStatus;
  tipo_orden: OrderType;
  motivo_cancelacion: string | null;
  notas: string;
  total: string;
  monto_pagado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  fecha_completado: string | null;
  _count: {
    items_orden: number;
  };
  items_orden: ItemsOrden[];
  usuarios: Usuarios;
  mesa_actual: MesaActual;
}

export interface ItemsOrden {
  id: string;
  orden_id: string;
  producto_id: string;
  variante_id: string;
  nombre_producto: string;
  nombre_variante: string;
  precio_variante: string;
  cantidad: number;
  precio_unitario: string;
  total_modificadores: string;
  total_linea: string;
  estado: OrderItemStatus;
  notas: string | null;
  fecha_creacion: string;
  fecha_actualizacion: string;
  modificadores_item_orden: ModificadoresItemOrden[];
}

export interface ModificadoresItemOrden {
  item_orden_id: string;
  modificador_id: string;
  nombre_modificador: string;
  precio_adicional: string;
}

export interface Usuarios {
  id: string;
  usuario: string;
  nombre_completo: string;
  rol: "admin" | "mesero" | "cajero" | "cocinero" | "bartender";
  esta_activo: boolean;
}

export interface MesaActual {
  id: string;
  numero_mesa: string;
  piso_id: string;
  estado: "disponible" | "ocupada" | "reservada" | "limpieza";
  reservada_para: string | null;
  orden_actual_id: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  pisos: Pisos;
}

export interface Pisos {
  id: string;
  nombre: string;
  nivel: number;
  esta_activo: boolean;
}
