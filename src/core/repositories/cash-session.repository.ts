import type {
  CashSessionRes,
  CashSessionHistorDto,
  CashSessionOrdersRes,
  CashSessionOrdersDto,
} from "../entities/cash-session.entity";

export interface CashSessionRepository {
  getCashSessionHistory(dto: CashSessionHistorDto): Promise<CashSessionRes>;
  getCashSessionOrders(
    dto: CashSessionOrdersDto,
  ): Promise<CashSessionOrdersRes>;
}
