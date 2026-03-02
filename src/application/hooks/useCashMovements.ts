import type { CashMovementsEntity } from "@/core/entities/cash-movements.entity";
import { cashMovementsApi } from "@/infrastructure/api/cash-movements.api";
import { getErrorMessage } from "@/utils/get-error-message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCashMovements = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create", "cash-movements"],
    mutationFn: (cashMovements: CashMovementsEntity) =>
      cashMovementsApi.createCashMovements(cashMovements),
    onMutate: () => {
      toast.loading("Creando movimiento de caja...", {
        id: "create-cash-movement",
      });
    },
    onSuccess: () => {
      toast.success("Movimiento de caja creado exitosamente", {
        id: "create-cash-movement",
      });
      queryClient.invalidateQueries({
        queryKey: ["cash-register", "session", "active"],
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: getErrorMessage(
          error,
          "Error al crear movimiento de caja",
        ),
        id: "create-cash-movement",
      });
    },
  });
};

export const useGetCashMovements = (
  sessionId: string,
  page: number,
  limit: number,
) => {
  return useQuery({
    queryKey: ["cash-movements", "list", page, limit],
    queryFn: () => cashMovementsApi.getCashMovements(sessionId, page, limit),
  });
};
