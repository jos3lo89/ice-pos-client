import { useMutation, useQuery } from "@tanstack/react-query";
import { cashierservice } from "../services/cashier.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type {
  CloseCashRegisterReq,
  OpenCashRegisterReq,
} from "../interfaces/cashier.interface";

// current session
export const useCurrentSession = () => {
  return useQuery({
    queryKey: ["cash-register", "session", "active"],
    queryFn: () => cashierservice.getCurrent(),
  });
};

// open session
export const useOpenSession = () => {
  return useMutation({
    mutationKey: ["cash-register", "session", "open"],
    mutationFn: (dto: OpenCashRegisterReq) => cashierservice.openSession(dto),
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
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al abrir la sesion";
      toast.error(message, { id: "open-session" });
    },
  });
};

// close session
export const useCloseSession = () => {
  return useMutation({
    mutationKey: ["cash-register", "session", "close"],
    mutationFn: (dto: { sessionId: string; values: CloseCashRegisterReq }) =>
      cashierservice.closeSession(dto),
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
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al cerrar la sesion";
      toast.error(message, { id: "close-session" });
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
    queryFn: () => cashierservice.getSessionPayments(dto),
    enabled: !!dto.sessionId,
  });
};
