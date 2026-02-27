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
