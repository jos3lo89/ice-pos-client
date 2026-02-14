// categorias de lista de categorias
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  _count: {
    products: number;
  };
}
export interface GetAllCategoriesRes {
  data: Category[];
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

// crear categoria
export interface CreateCategorieRes {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// actualizar estado de categoria
export interface UpdateStateCategoryRes {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  _count: {
    products: number;
  };
}

// lista completa de categorias
export interface ListCategoryCompleteRes {
  id: string;
  name: string;
  slug: string;
  _count: {
    products: number;
  };
}

// actualizar estado de categoria
export interface UpdateStateCategoryReq {
  categorieId: string;
  payload: {
    is_active: boolean;
  };
}

// categoria con sus productos
export interface CategoryWithProductsRes {
  id: string;
  name: string;
  slug: string;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: string;
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
