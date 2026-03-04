import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "@/infrastructure/api/reports.api";

export const useReportBySessionId = (sessionId: string) => {
  return useQuery({
    queryKey: ["cash-sessions", "report", sessionId],
    queryFn: () => reportsApi.getReportBySessionId(sessionId),
  });
};
