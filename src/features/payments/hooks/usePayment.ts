import { useMutation, useQuery } from "@tanstack/react-query";
import { paymentService } from "../services/payment.service";
import type { CreatePaymentDto } from "../interfaces/payment.interface";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-payment"],
    mutationFn: (payment: CreatePaymentDto) =>
      paymentService.createPayment(payment),
    onMutate: () => {
      toast.loading("Creando pago...", { id: "create-payment" });
    },
    onSuccess: () => {
      toast.success("Pago creado exitosamente", { id: "create-payment" });
      queryClient.invalidateQueries({ queryKey: ["order", "details"] });
      queryClient.invalidateQueries({
        queryKey: ["cash-register", "session", "active"],
      });
      queryClient.invalidateQueries({ queryKey: ["floors", "with-tables"] });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al crear el pago";
      toast.error(message, { id: "create-payment" });
    },
  });
};

export const useGetTicket = (paymentId: string) => {
  return useQuery({
    queryKey: ["ticket", paymentId],
    queryFn: () => paymentService.getTicket(paymentId),
    enabled: !!paymentId,
  });
};
