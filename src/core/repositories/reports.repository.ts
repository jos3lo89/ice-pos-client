import type {
  RankingProductsQuery,
  RankingProductsResponse,
  ReportResponse,
  VentasPorDiaQuery,
  VentasPorDiaResponse,
} from "../entities/reports.entity";

export interface ReportsRepository {
  getReportBySessionId(sessionId: string): Promise<ReportResponse>;
  getRankingProducts(
    query: RankingProductsQuery,
  ): Promise<RankingProductsResponse>;
  getVentasPorDia(query: VentasPorDiaQuery): Promise<VentasPorDiaResponse>;
}
