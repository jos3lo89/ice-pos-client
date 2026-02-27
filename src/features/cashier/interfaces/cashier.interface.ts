// sesion  actual
export interface CurrentSessionRes {
  hasActiveSession: boolean;
  session: Session;
}

export interface Session {
  id: string;
  estado: string;
  fecha_apertura: string;
  notas: string;
  cajero: Cajero;
  caja_fisica: CajaFisica;
  ventas_digitales: VentasDigitales;
  resumen: Resumen;
}

export interface Cajero {
  id: string;
  nombre: string;
  usuario: string;
}

export interface CajaFisica {
  saldo_apertura: number;
  saldo_esperado: number;
  ventas_efectivo: number;
}

export interface VentasDigitales {
  yape: number;
  plin: number;
  tarjeta: number;
}

export interface Resumen {
  total_ventas: number;
  total_efectivo: number;
  total_digital: number;
}

// abrir sesion
export interface OpenSessionRes {
  id: string;
  cajero_id: string;
  saldo_apertura: string;
  saldo_esperado: string;
  saldo_real: string;
  diferencia: string;
  total_yape: string;
  total_plin: string;
  total_tarjeta: string;
  estado: string;
  notas: string;
  fecha_apertura: string;
  fecha_cierre: string | null;
}

// cerrar sesion
export interface CloseSessionRes {
  sesion: Sesion;
  arqueo: Arqueo;
  ventas: Ventas;
  // TODO: definir tipo
  movimientos_manuales: any[];
}

export interface Sesion {
  id: string;
  cajero: string;
  fecha_apertura: string;
  fecha_cierre: string;
}

export interface Arqueo {
  saldo_apertura: number;
  ventas_efectivo: number;
  saldo_esperado: number;
  saldo_real: number;
  diferencia: number;
  esta_cuadrada: boolean;
}

export interface Ventas {
  efectivo: number;
  yape: number;
  plin: number;
  tarjeta: number;
  total: number;
}

// abrir caja request
export interface OpenCashRegisterReq {
  openingBalance: number;
  notes: string;
}

// cerrar caja request
export interface CloseCashRegisterReq {
  actualBalance: number;
  notes: string;
}
