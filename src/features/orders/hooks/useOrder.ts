import { useMutation, useQuery } from "@tanstack/react-query";
import type { AddProductToOrderT, CreateOrderT } from "../schemas/order.schema";
import { orderService } from "../services/order.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

// crear orden
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create", "order"],
    mutationFn: (order: CreateOrderT) => orderService.create(order),
    onMutate: () => {
      toast.loading("Creando orden...", { id: "create-order" });
    },
    onSuccess: () => {
      toast.success("Orden creada correctamente", { id: "create-order" });
      queryClient.invalidateQueries({ queryKey: ["floors", "with-tables"] });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al crear la orden";
      toast.error(message, { id: "create-order" });
    },
  });
};

// agregar producto a la orden
export const useAddProductToOrder = () => {
  return useMutation({
    mutationKey: ["add", "product", "to", "order"],
    mutationFn: (dto: { orderId: string; order: AddProductToOrderT }) =>
      orderService.addProductToOrder(dto),
    onMutate: () => {
      toast.loading("Agregando producto a la orden...", {
        id: "add-product-to-order",
      });
    },
    onSuccess: () => {
      toast.success("Producto agregado correctamente", {
        id: "add-product-to-order",
      });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al agregar el producto a la orden";
      toast.error(message, { id: "add-product-to-order" });
    },
  });
};

// get current order by id

export const useGetCurrentOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ["current", "order", orderId],
    queryFn: () => orderService.getOrderById(orderId),
    enabled: !!orderId,
  });
};
