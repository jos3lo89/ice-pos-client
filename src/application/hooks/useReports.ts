import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "@/infrastructure/api/reports.api";
import type {
  RankingProductsQuery,
  VentasPorDiaQuery,
  VentasPorSemanaQuery,
} from "@/core/entities/reports.entity";

// reporte por sesion de caja
export const useReportBySessionId = (sessionId: string) => {
  return useQuery({
    queryKey: ["cash-sessions", "report", sessionId],
    queryFn: () => reportsApi.getReportBySessionId(sessionId),
  });
};

// ranking de productos
export const useRankingProducts = (query: RankingProductsQuery) => {
  return useQuery({
    queryKey: ["ranking-products", query],
    queryFn: () => reportsApi.getRankingProducts(query),
  });
};

// ventas por dia
export const useVentasPorDia = (query: VentasPorDiaQuery) => {
  return useQuery({
    queryKey: ["ventas-por-dia", query],
    queryFn: () => reportsApi.getVentasPorDia(query),
  });
};

// ventas por semana
export const useVentasPorSemana = (query: VentasPorSemanaQuery) => {
  return useQuery({
    queryKey: ["ventas-por-semana", query],
    queryFn: () => reportsApi.getVentasPorSemana(query),
  });
};
