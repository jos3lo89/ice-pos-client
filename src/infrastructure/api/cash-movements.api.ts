import http from "@/config/axios";
import type {
  CashMovementsEntity,
  CashMovementsResponse,
  GetCashMovementsResponse,
} from "@/core/entities/cash-movements.entity";
import type { CashMovementsRepository } from "@/core/repositories/cash-movements.repository";

class CashMovementsApi implements CashMovementsRepository {
  private readonly baseUrl = "cash-movements";

  async createCashMovements(
    cashMovements: CashMovementsEntity,
  ): Promise<CashMovementsResponse> {
    const { data } = await http.post(this.baseUrl, cashMovements);

    return data;
  }

  async getCashMovements(
    sessionId: string,
    page: number,
    limit: number,
  ): Promise<GetCashMovementsResponse> {
    const { data } = await http.get(`${this.baseUrl}/${sessionId}/movements`, {
      params: {
        page,
        limit,
      },
    });

    return data;
  }
}

export const cashMovementsApi = new CashMovementsApi();
