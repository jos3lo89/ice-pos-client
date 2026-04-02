export type OrderStatusT =
  | "pendiente"
  | "preparando"
  | "listo"
  | "servido"
  | "completado"
  | "cancelado";

// crear orden response
export interface CreateOrderRes {
  id: string;
  numero_orden: string;
  mesa_id: string;
  mesero_id: string;
  estado: string;
  tipo_orden: string;
  motivo_cancelacion: string | null;
  notas: string;
  total: string;
  monto_pagado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  fecha_completado: string | null;
}

// agregar producto a la orden response
export interface AddProductToOrderRes {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string;
  quantity: number;
  unit_price: string;
  modifiers_total: string;
  line_total: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
  order_item_modifiers: {
    order_item_id: string;
    modifier_id: string;
    modifier_name: string;
    additional_price: string;
  }[];
  products: {
    name: string;
  };
  product_variants: {
    variant_name: string;
  } | null;
}

// eliminar producto de la orden response
export interface DeleteOrderItemRes {
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
  estado: string;
  notas: string | null;
  fecha_creacion: string;
  fecha_actualizacion: string;
  ordenes: {
    id: string;
  };
}

// eliminar orden response
export interface DeleteOrderRes {
  id: string;
  numero_orden: string;
  mesa_id: string;
  mesero_id: string;
  estado: string;
  tipo_orden: string;
  motivo_cancelacion: string | null;
  notas: string | null;
  total: string;
  monto_pagado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  fecha_completado: string | null;
}

// enviar comanda request
export interface SendComandT {
  orderId: string;
  itemsId: string[];
}

// enviar comando response
export interface SendComandRes {
  id: string;
  numero_orden: string;
  mesa_id: string;
  mesero_id: string;
  estado: string;
  tipo_orden: string;
  motivo_cancelacion: string | null;
  notas: string;
  total: string;
  monto_pagado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  fecha_completado: string | null;
}

// crear orden request
export interface CreateOrderI {
  table_id?: string;
  tipo_orden?: "en_local" | "para_llevar" | "delivery";
  notes?: string;
}

// agregar producto a la orden request
export interface AddProductToOrderI {
  productId: string;
  quantity: number;
  variant_id?: string;
  modifier_ids?: string[];
  notes?: string;
  separado: boolean;
}

// ordenes para llevar

export interface OrderTakeAwayRes {
  id: string;
  numero_orden: string;
  numero_diario: number;
  mesa_id: string | null;
  mesero_id: string;
  estado: "pendiente" | "preparando" | "listo" | "cancelado";
  tipo_orden: "para_llevar";
  motivo_cancelacion: string | null;
  notas: string | null;
  total: string;
  monto_pagado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  fecha_completado: string | null;
  sesion_caja_id: string;
  usuarios: {
    id: string;
    nombre_completo: string;
  };
}
