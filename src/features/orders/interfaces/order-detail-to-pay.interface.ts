export interface OrderDetailToPayRes {
  orden: Orden;
  items: Item[];
  resumen: Resumen;
  historial_pagos: HistorialPago[];
}

export interface Orden {
  id: string;
  numero_order: string;
  estado:
    | "pendiente"
    | "preparando"
    | "listo"
    | "servido"
    | "completado"
    | "cancelado";
  tipo_order: "en_local" | "para_llevar";
  mesero: string;
  mesa: string;
  piso: number;
  notas: string | null;
}

export interface Item {
  id: string;
  nombre_producto: string;
  nombre_variante: string | null;
  precio_variante: number;
  cantidad: number;
  cantidad_pagada: number;
  cantidad_pendiente: number;
  precio_unitario: number;
  total_modificadores: number;
  total_linea: number;
  esta_pagado: boolean;
  modificadores: Modificadore[];
}

export interface Modificadore {
  nombre: string;
  precio: number;
}

export interface Resumen {
  total_orden: number;
  total_pagado: number;
  total_pendiente: number;
  esta_pagado_completo: boolean;
}

export interface HistorialPago {
  id: string;
  numero_pago: string;
  monto: string;
  vuelto: string | null;
  monto_recibido: string | null;
  metodo: "efectivo" | "tarjeta" | "yape" | "plin";
  tipo_documento: "ticket" | "boleta" | "factura";
  fecha_creacion: string;
}
