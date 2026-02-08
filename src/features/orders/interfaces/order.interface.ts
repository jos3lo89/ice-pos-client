// crear orden response
export interface CreateOrderRes {
  id: string;
  order_number: string;
  table_id: string;
  mesero_id: string;
  status: string;
  order_type: string;
  cancellation_reason: string | null;
  notes: string;
  subtotal: string;
  igv: string;
  total: string;
  amount_paid: string;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
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
