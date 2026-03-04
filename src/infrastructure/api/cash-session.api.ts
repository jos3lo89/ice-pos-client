import http from "@/config/axios";
import type {
  CashSessionHistorDto,
  CashSessionOrdersDto,
  CashSessionOrdersRes,
  CashSessionRes,
} from "@/core/entities/cash-session.entity";
import type { CashSessionRepository } from "@/core/repositories/cash-session.repository";
import type { AxiosInstance } from "axios";

class CashSessionApi implements CashSessionRepository {
  private readonly baseUrl = "cash-sessions";
  private readonly api: AxiosInstance = http;

  // historial de sesiones de caja por usuario
  async getCashSessionHistory(
    dto: CashSessionHistorDto,
  ): Promise<CashSessionRes> {
    const { data: res } = await this.api.get<CashSessionRes>(
      `${this.baseUrl}/${dto.user_id}/history`,
      {
        params: dto.meta,
      },
    );
    return {
      data: res.data,
      meta: res.meta,
    };
  }

  // historial de ordernes por session de caja
  async getCashSessionOrders(
    dto: CashSessionOrdersDto,
  ): Promise<CashSessionOrdersRes> {
    const { data: res } = await this.api.get<CashSessionOrdersRes>(
      `${this.baseUrl}/${dto.sessionId}/orders`,
      {
        params: dto.meta,
      },
    );
    return {
      data: res.data,
      meta: res.meta,
    };
  }
}

export const cashSessionApi = new CashSessionApi();
