import type {
  CashMovementsEntity,
  CashMovementsResponse,
} from "../domain/cash-movements.entity";

export interface CashMovementsRepository {
  createCashMovements(
    cashMovements: CashMovementsEntity,
  ): Promise<CashMovementsResponse>;
}
