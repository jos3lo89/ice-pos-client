import http from "@/config/axios";
import type {
  CloseCashRegisterReq,
  CloseSessionRes,
  CurrentSessionRes,
  OpenCashRegisterReq,
  OpenSessionRes,
} from "../interfaces/cashier.interface";
import type { GetSessionPaymentsRes } from "../interfaces/session-payments.interface";
import { da } from "zod/v4/locales";

class CashierService {
  private readonly baseUrl = "cash-sessions";

  async getCurrent() {
    const { data } = await http.get<CurrentSessionRes>(
      `${this.baseUrl}/current`,
    );
    return data;
  }

  // abrir sesion
  async openSession(dto: OpenCashRegisterReq) {
    const { data } = await http.post<OpenSessionRes>(
      `${this.baseUrl}/open`,
      dto,
    );
    return data;
  }

  // cerrar sesion
  async closeSession(dto: { sessionId: string; values: CloseCashRegisterReq }) {
    const { data } = await http.patch<CloseSessionRes>(
      `${this.baseUrl}/${dto.sessionId}/close`,
      dto.values,
    );
    return data;
  }

  // obetener pagos de la sesion
  async getSessionPayments(dto: {
    sessionId: string;
    meta: {
      page?: number;
      limit?: number;
      search?: string;
    };
  }) {
    const { data: res } = await http.get<GetSessionPaymentsRes>(
      `${this.baseUrl}/${dto.sessionId}/payments`,
      {
        params: dto.meta,
      },
    );
    return {
      pagos: res.data,
      meta: res.meta,
    };
  }
}

export const cashierservice = new CashierService();
