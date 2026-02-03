export interface GetAllCategoriesRes {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  _count: {
    products: number;
  };
}

export interface GetAllCategoriesMeta {
  total: number;
  page: number;
  lastPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface CreateCategorieRes {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateStateCategorieRes {
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
