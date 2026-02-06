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
