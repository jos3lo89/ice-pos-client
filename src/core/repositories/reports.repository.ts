import type { ReportResponse } from "../entities/reports.entity";

export interface ReportsRepository {
  getReportBySessionId(sessionId: string): Promise<ReportResponse>;
}
