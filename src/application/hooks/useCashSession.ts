import { useQuery } from "@tanstack/react-query";
import {
  type CashSessionHistorDto,
  type CashSessionOrdersDto,
} from "@/core/entities/cash-session.entity";
import { cashSessionApi } from "@/infrastructure/api/cash-session.api";

export const useCashSessionHistory = (dto: CashSessionHistorDto) => {
  return useQuery({
    queryKey: ["cash-session-history", dto.user_id, dto.meta],
    queryFn: () => cashSessionApi.getCashSessionHistory(dto),
  });
};

// historial de ordernes por session de caja
export const useCashSessionOrders = (dto: CashSessionOrdersDto) => {
  return useQuery({
    queryKey: ["cash-session-orders", dto.sessionId, dto.meta],
    queryFn: () => cashSessionApi.getCashSessionOrders(dto),
  });
};
