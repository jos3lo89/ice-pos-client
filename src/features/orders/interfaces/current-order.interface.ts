export interface CurrentOrderRes {
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
  _count: Count;
  order_items: OrderItem[];
  tables_orders_table_idTotables: TablesOrdersTableIdTotables;
  users: Users;
}

export interface Count {
  order_items: number;
}
export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  unit_price: string;
  modifiers_total: string;
  line_total: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
  products: Products;
  order_item_modifiers?: OrderItemModifier[];
  product_variants?: ProductVariant | null;
}

export interface OrderItemModifier {
  order_item_id: string;
  modifier_id: string;
  modifier_name: string;
  additional_price: string;
}

export interface Products {
  id: string;
  name: string;
  price: string;
  category_id: string;
  area_impresion: string;
  description: string | null;
  is_available: boolean;
  codigo_sunat: string;
  unidad_medida: string;
  afec_igv_tipo: string;
  created_at: string;
  updated_at: string;
  product_modifiers: ProductModifier[];
  product_variants: ProductVariant[];
}

export interface ProductModifier {
  id: string;
  product_id: string;
  modifier_name: string;
  additional_price: string;
  is_active: boolean;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  variant_name: string;
  additional_price: string;
  is_active: boolean;
}

export interface TablesOrdersTableIdTotables {
  id: string;
  table_number: string;
  floor_id: string;
  status: string;
  reserved_for: string | null;
  current_order_id: string;
  created_at: string;
  updated_at: string;
  floors: Floors;
}

export interface Floors {
  id: string;
  name: string;
  level: number;
  is_active: boolean;
}

export interface Users {
  id: string;
  username: string;
  full_name: string;
  role: string;
  is_active: boolean;
}
