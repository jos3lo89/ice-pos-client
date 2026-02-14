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
  tables_orders_table_idTotables: {
    id: string;
    table_number: string;
    floor_id: string;
    status: string;
    reserved_for: string | null;
    current_order_id: string | null;
    created_at: string;
    updated_at: string;
    floors: {
      id: string;
      name: string;
      level: number;
      is_active: boolean;
      created_at: string;
      updated_at: string;
    };
  };
  users: {
    id: string;
    username: string;
    password: string;
    full_name: string;
    role: string;
    is_active: boolean;
    phone: string;
    created_at: string;
    updated_at: string;
  };
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
