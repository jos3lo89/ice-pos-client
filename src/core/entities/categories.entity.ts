// categorias de lista de categorias
export interface Category {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  esta_activa: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
  _count: {
    productos: number;
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
  nombre: string;
  slug: string;
  descripcion: string | null;
  esta_activa: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// actualizar estado de categoria
export interface UpdateStateCategoryRes {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  esta_activa: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
  _count: {
    productos: number;
  };
}

// lista completa de categorias
export interface ListCategoryCompleteRes {
  id: string;
  nombre: string;
  slug: string;
  _count: {
    productos: number;
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
  nombre: string;
  slug: string;
  productos: Producto[];
}

export interface Producto {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: string;
  modificadores_producto: ModificadoresProducto[];
  variantes_producto: VariantesProducto[];
}

export interface ModificadoresProducto {
  id: string;
  producto_id: string;
  nombre_modificador: string;
  precio_adicional: string;
  esta_activo: boolean;
}

export interface VariantesProducto {
  id: string;
  producto_id: string;
  nombre_variante: string;
  precio_adicional: string;
  esta_activa: boolean;
}

// crear categoria
export interface CreateCategorieT {
  nombre: string;
  slug: string;
  descripcion: string | null;
}
