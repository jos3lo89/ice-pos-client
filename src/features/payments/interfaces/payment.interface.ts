export interface CreatePaymentDto {
  orderId: string;
  method: "efectivo" | "tarjeta" | "yape" | "plin";
  tipoDocumento: "ticket" | "boleta" | "factura";
  montoRecibido: number | null;
  transactionId: string | null;
  clienteId: string;
  notes: string | null;
  lines: Line[];
}

export interface Line {
  orderItemId: string;
}

// create payment response
export interface CreatePaymentRes {
  pago: Pago;
  orden_completada: boolean;
}

export interface Pago {
  id: string;
  numero_pago: string;
  monto: number;
  monto_recibido: number | null;
  vuelto: number | null;
  metodo: "efectivo" | "tarjeta" | "yape" | "plin";
  tipo_documento: "ticket" | "boleta" | "factura";
  fecha: string;
}

// get ticket response
export interface GetTicketRes {
  negocio: Negocio;
  comprobante: Comprobante;
  orden: Orden;
  cliente: Cliente;
  items: Item[];
  totales: Totales;
  cajero: string;
}

export interface Negocio {
  nombre: string;
  ruc: string;
  direccion: string;
}

export interface Comprobante {
  numero_pago: string;
  tipo_documento: string;
  fecha: string;
  metodo: string;
}

export interface Orden {
  numero_orden: string;
  tipo_orden: string;
  mesa: string;
  mesero: string;
  notas: string;
}

export interface Cliente {
  razon_social: string;
  numero_documento: string;
  tipo_documento: string;
  direccion: string;
}

export interface Item {
  nombre_producto: string;
  nombre_variante: any;
  precio_variante: number;
  cantidad: number;
  precio_unitario: number;
  total_modificadores: number;
  total_linea: number;
  modificadores: any[];
}

export interface Totales {
  subtotal: number;
  monto_recibido: number;
  vuelto: number;
}
