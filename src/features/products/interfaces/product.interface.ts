// obtener todos los productos
export interface GetAllProductsRes {
  data: Product[];
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

export interface Product {
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
  categories: {
    id: string;
    name: string;
    slug: string;
  };
  product_variants: {
    id: string;
    product_id: string;
    variant_name: string;
    additional_price: string;
    is_active: boolean;
  }[];
  product_modifiers: {
    id: string;
    product_id: string;
    modifier_name: string;
    additional_price: string;
    is_active: boolean;
  }[];
}

// crear producto
export interface CreateProductRes {
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
}

// actualizar estado del producto
export interface UpdateStatusProductRes {
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
}
