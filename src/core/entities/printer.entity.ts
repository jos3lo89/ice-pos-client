export interface NetworkConfig {
  id: number;
  segment: string;
  port: number;
  timeout: number;
  descripcion: string | null;
}

export interface NetworkConfigCreate {
  segment: string;
  port?: number;
  timeout?: number;
  descripcion?: string;
}

export interface PrinterLocal {
  type: "local";
  name: string;
  detail: string;
  ip: null;
  port: null;
}

export interface PrinterNetwork {
  type: "network";
  name: string;
  detail: string;
  ip: string;
  port: number;
}

export type Printer = PrinterLocal | PrinterNetwork;

export interface DiscoverResponse {
  config_usada: {
    segment: string;
    port: number;
    descripcion: string | null;
  };
  local: PrinterLocal[];
  network: PrinterNetwork[];
  count_local: number;
  count_network: number;
  segment_scanned: string;
}

export interface SavedPrinter {
  id: number;
  nombre: string; // "caja" | "bar" | "cocina"
  tipo: string; // "usb" | "network"
  ip: string | null;
  puerto: number;
  vendor_id: string | null;
  product_id: string | null;
  activa: boolean;
}

export interface SavedPrinterCreate {
  nombre: string;
  tipo: string;
  ip?: string;
  puerto?: number;
  vendor_id?: string;
  product_id?: string;
}

export interface SavedPrinterUpdate {
  ip?: string;
  puerto?: number;
  vendor_id?: string;
  product_id?: string;
  activa?: boolean;
}

export interface TestResult {
  ok: boolean;
  mensaje: string;
}

export interface DiscoverError {
  error: string;
  mensaje: string;
  accion: string;
}
