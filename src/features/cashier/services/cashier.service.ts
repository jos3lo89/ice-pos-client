import http from "@/config/axios";
import type {
  CloseCashRegisterReq,
  CloseSessionRes,
  CurrentSessionRes,
  OpenCashRegisterReq,
  OpenSessionRes,
} from "../interfaces/cashier.interface";

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
}

export const cashierservice = new CashierService();
