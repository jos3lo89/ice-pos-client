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
  nombre: string;
  precio: string;
  categoria_id: string;
  area_impresion: string;
  descripcion?: string;
  esta_disponible: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
  categorias: {
    id: string;
    nombre: string;
    slug: string;
  };
  variantes_producto: {
    id: string;
    producto_id: string;
    nombre_variante: string;
    precio_adicional: string;
    esta_activa: boolean;
  }[];

  modificadores_producto: {
    id: string;
    producto_id: string;
    nombre_modificador: string;
    precio_adicional: string;
    esta_activo: boolean;
  }[];
}

// crear producto
export interface CreateProductRes {
  id: string;
  nombre: string;
  precio: string;
  categoria_id: string;
  area_impresion: string;
  descripcion: string | null;
  esta_disponible: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// actualizar estado del producto
export interface UpdateStatusProductRes {
  id: string;
  nombre: string;
  precio: string;
  categoria_id: string;
  area_impresion: string;
  descripcion: string | null;
  esta_disponible: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// crear variante de producto
export interface CreateVariantRes {
  id: string;
  producto_id: string;
  nombre_variante: string;
  precio_adicional: string;
  esta_activa: boolean;
  productos: {
    id: string;
    nombre: string;
    precio: string;
    categoria_id: string;
    area_impresion: string;
    descripcion: string | null;
    esta_disponible: boolean;
    fecha_creacion: string;
    fecha_actualizacion: string;
  };
}

// crear modificador de producto
export interface CreateModifierRes {
  id: string;
  producto_id: string;
  nombre_modificador: string;
  precio_adicional: string;
  esta_activo: boolean;
  productos: {
    id: string;
    nombre: string;
    precio: string;
    categoria_id: string;
    area_impresion: string;
    descripcion: string | null;
    esta_disponible: boolean;
    fecha_creacion: string;
    fecha_actualizacion: string;
  };
}
