import http from "@/config/axios";
import type {
  CashMovementsEntity,
  CashMovementsResponse,
} from "@/core/domain/cash-movements.entity";
import type { CashMovementsRepository } from "@/core/ports/cash-movements.repository";

class CashMovementsApi implements CashMovementsRepository {
  private readonly baseUrl = "cash-movements";

  async createCashMovements(
    cashMovements: CashMovementsEntity,
  ): Promise<CashMovementsResponse> {
    const { data } = await http.post(this.baseUrl, cashMovements);

    return data;
  }
}

export const cashMovementsApi = new CashMovementsApi();
