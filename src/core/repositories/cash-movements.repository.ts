import type {
  CashMovementsEntity,
  CashMovementsResponse,
  GetCashMovementsResponse,
} from "../entities/cash-movements.entity";

export interface CashMovementsRepository {
  createCashMovements(
    cashMovements: CashMovementsEntity,
  ): Promise<CashMovementsResponse>;

  getCashMovements(
    sessionId: string,
    page: number,
    limit: number,
  ): Promise<GetCashMovementsResponse>;
}
