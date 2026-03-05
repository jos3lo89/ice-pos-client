import http from "@/config/axios";
import type {
  RankingProductsQuery,
  RankingProductsResponse,
  ReportResponse,
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
}

export const reportsApi = new ReportsApi();
