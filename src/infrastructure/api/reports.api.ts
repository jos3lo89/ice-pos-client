import http from "@/config/axios";
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
} from "@/core/entities/reports.entity";
import type { ReportsRepository } from "@/core/repositories/reports.repository";
import type { AxiosInstance } from "axios";

class ReportsApi implements ReportsRepository {
  private readonly baseUrl = "reports";
  private readonly api: AxiosInstance = http;
  async getReportBySessionId(sessionId: string): Promise<ReportResponse> {
    const { data } = await this.api.get<ReportResponse>(
      `${this.baseUrl}/sessions/${sessionId}`,
    );
    return data;
  }

  async getRankingProducts(
    query: RankingProductsQuery,
  ): Promise<RankingProductsResponse> {
    const { data } = await this.api.get<RankingProductsResponse>(
      `${this.baseUrl}/productos/ranking`,
      { params: query },
    );
    return data;
  }

  async getVentasPorDia(
    query: VentasPorDiaQuery,
  ): Promise<VentasPorDiaResponse> {
    const { data } = await this.api.get<VentasPorDiaResponse>(
      `${this.baseUrl}/ventas/diario`,
      { params: query },
    );
    return data;
  }

  async getVentasPorSemana(
    query: VentasPorSemanaQuery,
  ): Promise<VentasPorSemanaResponse> {
    const { data } = await this.api.get<VentasPorSemanaResponse>(
      `${this.baseUrl}/ventas/semanal`,
      { params: query },
    );
    return data;
  }

  async getVentasPorMes(
    query: VentasPorMesQuery,
  ): Promise<VentasPorMesResponse> {
    const { data } = await this.api.get<VentasPorMesResponse>(
      `${this.baseUrl}/ventas/mensual`,
      { params: query },
    );
    return data;
  }

  async getHistorialSesiones(
    query: HistorialSesionesQuery,
  ): Promise<HistorialSesionesResponse> {
    const { data } = await this.api.get<HistorialSesionesResponse>(
      `${this.baseUrl}/sesiones`,
      { params: query },
    );
    return data;
  }
}

export const reportsApi = new ReportsApi();
