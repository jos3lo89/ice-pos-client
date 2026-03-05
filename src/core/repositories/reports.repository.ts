import type {
  RankingProductsQuery,
  RankingProductsResponse,
  ReportResponse,
} from "../entities/reports.entity";

export interface ReportsRepository {
  getReportBySessionId(sessionId: string): Promise<ReportResponse>;
  getRankingProducts(
    query: RankingProductsQuery,
  ): Promise<RankingProductsResponse>;
}
