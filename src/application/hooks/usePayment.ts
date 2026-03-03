import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import type { CreatePaymentDto } from "@/core/entities/payment.entity";
import { paymentApi } from "@/infrastructure/api/payment.api";
import { getErrorMessage } from "@/utils/get-error-message";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-payment"],
    mutationFn: (payment: CreatePaymentDto) =>
      paymentApi.createPayment(payment),
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
      toast.error(getErrorMessage(error, "Error al crear el pago"), {
        id: "create-payment",
      });
    },
  });
};

export const useGetTicket = (paymentId: string) => {
  return useQuery({
    queryKey: ["ticket", paymentId],
    queryFn: () => paymentApi.getTicket(paymentId),
    enabled: !!paymentId,
  });
};
