import type {
  CashMovementsEntity,
  CashMovementsResponse,
} from "../entities/cash-movements.entity";

export interface CashMovementsRepository {
  createCashMovements(
    cashMovements: CashMovementsEntity,
  ): Promise<CashMovementsResponse>;
}
