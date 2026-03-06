import type {
  HistorialSesionesQuery,
  HistorialSesionesResponse,
  RankingProductsQuery,
  RankingProductsResponse,
  ReportResponse,
  VentasPorDiaQuery,
  VentasPorDiaResponse,
  VentasPorMesQuery,
  VentasPorMesResponse,
  VentasPorSemanaQuery,
  VentasPorSemanaResponse,
} from "../entities/reports.entity";

export interface ReportsRepository {
  getReportBySessionId(sessionId: string): Promise<ReportResponse>;
  getRankingProducts(
    query: RankingProductsQuery,
  ): Promise<RankingProductsResponse>;
  getVentasPorDia(query: VentasPorDiaQuery): Promise<VentasPorDiaResponse>;
  getVentasPorSemana(
    query: VentasPorSemanaQuery,
  ): Promise<VentasPorSemanaResponse>;
  getVentasPorMes(query: VentasPorMesQuery): Promise<VentasPorMesResponse>;
  getHistorialSesiones(
    query: HistorialSesionesQuery,
  ): Promise<HistorialSesionesResponse>;
}
