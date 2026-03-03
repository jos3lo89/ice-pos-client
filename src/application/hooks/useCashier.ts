import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";
import { cashierApi } from "@/infrastructure/api/cashier.api";
import type {
  CloseCashRegisterReq,
  OpenCashRegisterReq,
} from "@/core/entities/cashier.entity";

// current session
export const useCurrentSession = () => {
  return useQuery({
    queryKey: ["cash-register", "session", "active"],
    queryFn: () => cashierApi.getCurrent(),
  });
};

// open session
export const useOpenSession = () => {
  return useMutation({
    mutationKey: ["cash-register", "session", "open"],
    mutationFn: (dto: OpenCashRegisterReq) => cashierApi.openSession(dto),
    onMutate: () => {
      toast.loading("Abriendo sesion...", {
        id: "open-session",
      });
    },
    onSuccess: () => {
      toast.success("Sesion abierta correctamente", {
        id: "open-session",
      });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Error al abrir la sesion"), {
        id: "open-session",
      });
    },
  });
};

// close session
export const useCloseSession = () => {
  return useMutation({
    mutationKey: ["cash-register", "session", "close"],
    mutationFn: (dto: { sessionId: string; values: CloseCashRegisterReq }) =>
      cashierApi.closeSession(dto),
    onMutate: () => {
      toast.loading("Cerrando sesion...", {
        id: "close-session",
      });
    },
    onSuccess: () => {
      toast.success("Sesion cerrada correctamente", {
        id: "close-session",
      });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Error al cerrar la sesion"), {
        id: "close-session",
      });
    },
  });
};

// obtener pagos de la sesion
export const useSessionPayments = (dto: {
  sessionId: string;
  meta: {
    page: number;
    limit: number;
    search?: string;
  };
}) => {
  return useQuery({
    queryKey: [
      "cash-register",
      "session",
      "payments",
      dto.sessionId,
      dto.meta.page,
      dto.meta.limit,
      dto.meta.search,
    ],
    queryFn: () => cashierApi.getSessionPayments(dto),
    enabled: !!dto.sessionId,
  });
};
