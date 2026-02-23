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
